<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'uuid' => ['required', 'string', 'max:255', Rule::unique('projects', 'uuid')->ignore($this->route('id')),],
            'name' => ['required', 'string', 'max:255'],
            'started_at' => ['required', 'date'],
            'ended_at' => ['required', 'date', 'after:started_at'],
            'status' => ['required', Rule::in(['WAITING', 'REFUSE', 'DEVELOPING', 'PAUSING', "DONE", 'FAILED', 'CLOSE'])],
            'description' => ['nullable', 'string'],
            'is_lock' => ['nullable', 'boolean'],
            'pm' => ['required', 'array'],
            'pm.*' => ['string', 'exists:users,id'],
            'pa_id' => ['required', 'exists:users,id'],
            'priority' => ['required', Rule::in(['LOW', 'MEDIUM', "HIGH"])],
            'personnel' => ['required', 'array'],
            'personnel.*' => ['string', 'exists:users,id'],
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->messages();
        $formattedErrors = [];
        foreach ($errors as $field => $messages) {
            $formattedErrors[$field] = $messages[0];
        }
        $response = response()->json([
            'errors' => $formattedErrors
        ], 400);
        throw new HttpResponseException($response);
    }
    public function messages(): array
    {
        return [
            'uuid.required' => 'Mã dự án là bắt buộc.',
            'uuid.unique' => 'Mã dự án đã tồn tại.',
            'name.required' => 'Tên dự án là bắt buộc.',
            'started_at.required' => 'Ngày bắt đầu là bắt buộc.',
            'ended_at.after' => 'Ngày kết thúc phải sau ngày bắt đầu.',
            'pm.required' => 'Danh sách nhân sự không được để trống.',
            'pm.array' => 'Danh sách nhân sự phải là một mảng.',
            'pm.*.exists' => 'Một hoặc nhiều ID nhân sự không tồn tại trong hệ thống.',
            'pa_id.exists' => 'Người hỗ trợ dự án không hợp lệ.',
            'priority.in' => 'Độ ưu tiên không hợp lệ.',
            'status.in' => 'Trạng thái không hợp lệ.',
            'personnel.required' => 'Danh sách nhân sự không được để trống.',
            'personnel.array' => 'Danh sách nhân sự phải là một mảng.',
            'personnel.*.exists' => 'Một hoặc nhiều ID nhân sự không tồn tại trong hệ thống.',
        ];
    }
}
