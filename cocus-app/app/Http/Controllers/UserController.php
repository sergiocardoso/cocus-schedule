<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller {

    /**
     * Get User that's logged
     */
    public function get(Request $request){
      return response()->json($request->user());  
    }

    /**
     * Edit User that's logged
     */
    public function edit(Request $request){
        $user = User::find(Auth::id());
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|'. Rule::unique('users')->ignore($user->id),
            'password' => 'required|max:10'
        ]);

        if($validator->fails())
        {
           return response()->json([
                'status_code' => 401,
                'message' => 'Error in Login',
                'error' => $validator->errors(),
                'data' => $request->all()
            ]);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');

        $user->save();

        return response()->json([
                'status_code' => 200,
                'message' => 'User Updated'
            ]);
    }

    /**
     * Delete User - soft delete
     */
    public function hide(){
        $user = User::find(Auth::id());

        if($user){
            try {
                $user->delete();
                return response()->json([
                    'status_code' => 200,
                    'message' => 'User deleted'
                ]);
            }
            catch (\Exception $error){
                return response()->json([
                    'status_code' => 401,
                    'message' => 'Error on delete',
                    'error' => $error,
                ]);
            }
        }

        return response()->json([
            'status_code' => 400,
            'message' => 'User not found',
        ]);
        
    }
}
