<?php

namespace App\Http\Requests\Project;

use App\Enum\ProjectStatus;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Enum;

class UpdateStatusRequest extends FormRequest
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
            'status' => ['required', new Enum(ProjectStatus::class)],
            'ended_at' => ['required', 'date'],
            'description' => ['nullable','string']
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
            'status.required' => 'Trạng thái là bắt buộc.',
            'pa_id.required' => 'Phải chọn người quản lý dự án.',
            'pa_id.exists' => 'Người quản lý dự án không tồn tại.',
            'ended_at.required' => 'Thời gian kết thúc là bắt buộc.',
            'ended_at.date' => 'Thời gian kết thúc phải là ngày hợp lệ.',
            'description.string' => 'Mô tả phải là chuỗi ký tự.',
        ];
    }
}
