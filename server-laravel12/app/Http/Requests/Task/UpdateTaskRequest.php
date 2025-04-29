<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'uuid' => ['required', 'string', 'max:255', Rule::unique('tasks', 'uuid')->ignore($this->route('id'))],
            'project_id' => ['required', 'exists:projects,id'],
            'status' => ['required', Rule::in(['DONE', 'PENDING', 'PAUSING', 'OVERDUE'])],
            'feature' => ['required', 'string'],
            'designated_personnel_id' => ['required', 'exists:users,id'],
            'status_changed_at' => ['nullable', 'date'],
            'ended_at' => ['nullable', 'date', 'after_or_equal:status_changed_at'],
            'priority' => ['required', Rule::in(['LOW', 'MEDIUM', "HIGH"])],
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
            'name.required' => 'Tên task là bắt buộc.',
            'name.string' => 'Tên task phải là chuỗi.',
            'description.required' => 'Mô tả là bắt buộc.',
            'uuid.required' => 'UUID là bắt buộc.',
            'uuid.unique' => 'UUID đã tồn tại.',
            'project_id.required' => 'Phải chọn project.',
            'project_id.exists' => 'Project không tồn tại.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ.',
            'feature.required' => 'Chức năng là bắt buộc.',
            'priority.in' => 'Độ ưu tiên không hợp lệ.',
            'designated_personnel_id.required' => 'Người được chỉ định là bắt buộc.',
            'designated_personnel_id.exists' => 'Người được chỉ định không tồn tại.',
            'status_changed_at.date' => 'Thời điểm thay đổi trạng thái phải là ngày hợp lệ.',
            'ended_at.date' => 'Thời gian kết thúc phải là ngày hợp lệ.',
            'ended_at.after_or_equal' => 'Thời gian kết thúc phải sau hoặc bằng thời điểm thay đổi trạng thái.',
        ];
    }
}
