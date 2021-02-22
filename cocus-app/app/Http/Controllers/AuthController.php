<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login
     */
    public function login(Request $request){

        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            $credentials = request(['email', 'password']);

            if(!Auth::attempt($credentials)){
                return response()
                    ->json(['status_code' => 500, 'message' => 'Unauthorized']);
            }

            $user = User::where('email', $request->email)->first();

            if(!Hash::check($request->password, $user->password, [])){
                throw new \Exception('Error in Login');
            }

            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer'
            ]);
        } catch(\Exception $error){
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error
            ]);
        }
    }

    /**
     * SignIn User
     */
    public function signin(Request $request){
        
        $rules = [
            'name'     => 'required',
            'email'    => 'unique:users|required',
            'password' => 'required'
        ];

        $input = $request->only('name', 'email', 'password');
        $validator = Validator::make($input, $rules);

        if($validator->fails()){
            return response()->json(['success' => false, 'error' => $validator->errors()], 401);
        }

        $name     = $request->name;
        $email    = $request->email;
        $password = $request->password;

        $user = User::create(['name' => $name, 'email' => $email, 'password' => Hash::make($password)]);

        return response()->json(['success' => $user]);
    }

    /**
     * Logout 
     */
    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'User is logout', 'data' => true], 200);
    }

    /**
     * Get User Logged
     */
    public function user(Request $request){
        return response()->json(['user' => $request->user, 'auth' => Auth::user()]);
    }
}