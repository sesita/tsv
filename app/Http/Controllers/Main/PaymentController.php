<?php

namespace App\Http\Controllers\Main;

use Stripe\Climate\Order;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function Checkout(Request $request)
    {
        $price_ids = [];

        if ($request->file) {
            $price_ids[] = 'price_1Q4iXcB9uNXBCzh8d6fGt3yg';
        }
        if ($request->promoted) {
            $price_ids[] = 'price_1Q4kseB9uNXBCzh8NqBXqFLK';
        }

        $customer = Auth::user();

        if (!$customer->hasStripeId()) {
            $customer->createAsStripeCustomer();
        }

        $transactionId = Str::random(10) . time();
        Transaction::create([
            'price' => 199,
            'status' => 'created',
            'transaction_id' => $transactionId,
        ]);

        $checkoutSession = $request->user()->checkout($price_ids, [
            'success_url' => route('checkout-success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout-cancel') . '?session_id={CHECKOUT_SESSION_ID}',
            'metadata' => ['transaction_id' => $transactionId],
        ]);

        return response()->json(['url' => $checkoutSession->url]);
    }
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

        $order = Order::findOrFail($orderId);

        $order->update(['status' => 'completed']);

        return redirect('/');
    }
}
