<?php

namespace App\Models;

use Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_id', 'video_id', 'price', 'status'];

    public function createOrder(Request $request){
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

        $this->create([
            'price' => 199,
            'status' => 'created',
            'transaction_id' => $transactionId,
        ]);

        $checkoutSession = $request->user()->checkout($price_ids, [
            'success_url' => route('checkout-success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout-cancel') . '?session_id={CHECKOUT_SESSION_ID}',
            'metadata' => ['transaction_id' => $transactionId],
        ]);

        return $checkoutSession;
    }
}
