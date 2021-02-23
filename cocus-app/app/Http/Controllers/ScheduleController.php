<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller {
    
    /**
     * Schedule - get all
     */
    public function list(){
        $user = User::find(Auth::id());
        $schedules = Schedule::where('user_id', $user->id)->get();

         return response()->json([
                'success' => true, 
                'data' => $schedules,
                'user' => $user,
        ], 200);
    }
    
    /**
     * Schedule
     * New 
     */
    public function new(Request $request){
        $rules = [
            'title'       => 'required',
            'description' => 'required',
            'date'        => 'required'
        ];

        $input = $request->only('title', 'description', 'date');
        $validator = Validator::make($input, $rules);

        if($validator->fails()){
            return response()->json([
                'success' => false, 
                'error' => $validator->errors(), 
                'data' => $request->all()], 401);
        }

        $title       = $request->input("title");
        $description = $request->input("description");
        $date        = date("Y-m-d H:i:s", (int)($request->input("date") / 1000));

        $schedule = Schedule::create([
            'title' => $title, 
            'description' => $description, 
            'date' => $date,
            'user_id' => Auth::id()
        ]);

         return response()->json([
                'success' => true,
                'message' => 'new schedule ok',
                'data'    => $schedule
            ], 200);
    }

    /**
     * Edit Schedule Item
     */
    public function edit(Request $request, $id){
        
        $schedule = Schedule::find($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'date' => 'required'
        ]);

        if($validator->fails())
        {
           return response()->json([
                'status_code' => 401,
                'message' => 'Error in update schedule item',
                'error' => $validator->errors(),
                'data' => $request->all()
            ]);
        }

        $schedule->title       = $request->input('title');
        $schedule->description = $request->input('description');
        $schedule->date        = date("Y-m-d H:i:s", (int)($request->input("date") / 1000));

         return response()->json([
                'success' => true,
                'message' => 'schedule edit - ok',
                'data'    => $schedule
            ], 200);

        $schedule->save();
    }

    /**
     * Delete Schedule Item - soft delete
     */
    public function delete($id){
        $schedule = Schedule::find($id);

        if($schedule){
            try {
                $schedule->delete();
                return response()->json([
                    'status_code' => 200,
                    'message' => 'Schedule deleted'
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
            'message' => 'Schedule not found',
        ]);
    }
}