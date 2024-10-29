<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Storage;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'name');
        return response()->json($settings);
    }

    public function updateSetting(Request $request)
    {
        $messages = [
            'settings.*.name.required' => 'Setting name is required.',
            'settings.*.value.required' => ':attribute is required.',
        ];

        // Create attributes array before validation
        $attributes = [];
        foreach ($request->settings as $index => $setting) {
            $attributes["settings.{$index}.value"] = str_replace('_', ' ', ucfirst($setting['name']));
        }

        $validatedData = $request->validate([
            'settings' => 'required|array',
            'settings.*.name' => 'required|string',
            'settings.*.value' => 'required',
        ], $messages, $attributes);

        foreach ($request->settings as $setting) {
            Setting::updateOrCreate(
                ['name' => $setting['name']],
                ['value' => $setting['value']]
            );
        }

        return response()->json(['message' => 'Settings updated successfully']);
    }

    public function uploadMedia(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|in:logo,favicon'
        ]);

        $fileName = 'primary/' . $request->file->getClientOriginalName();
        $request->file->move(public_path('storage/primary'), $fileName);

        $setting = Setting::updateOrCreate(
            ['name' => $request->type],
            ['value' => $fileName]
        );

        return response()->json([
            'url' => $fileName,
            'message' => 'Image uploaded successfully'
        ]);
    }
}