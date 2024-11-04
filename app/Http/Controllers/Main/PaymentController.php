<?php

namespace App\Http\Controllers\Main;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function Success(Request $request)
    {
        $sessionId = $request->get('session_id');

        if ($sessionId === null) {
            return;
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return;
        }

        $orderId = $session['metadata']['transaction_id'] ?? null;

        $order = Transaction::findOrFail($orderId);

        $order->update(['status' => 'completed']);

        return redirect('/');
    }
}
