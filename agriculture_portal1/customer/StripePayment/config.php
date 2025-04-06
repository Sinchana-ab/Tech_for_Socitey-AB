<?php
	require_once "stripe-php-master/init.php";
	require_once "products.php";

$stripeDetails = array(
		"secretKey" => "sk_test_51QQVVyF0P57CU7Pn9I1tRG5V5o4gal2zSVHWd4i5f5rWwogiqrSeKol58sw0pHD18197CcyqTcsevTrTFstRV9aA00V0Gt5Dxa",  //Your Stripe Secret key
		"publishableKey" => "pk_test_51QQVVyF0P57CU7PnYqpCUcrYuZjM4A68bJRQJKOaIMOjfkGSrL5nz7mBf0vlByoD10rMiWrRXLPDzVLVtAyYB2g600rk6uAbeE"  //Your Stripe Publishable key
	);

	// Set your secret key: remember to change this to your live secret key in production
	// See your keys here: https://dashboard.stripe.com/account/apikeys
	\Stripe\Stripe::setApiKey($stripeDetails['secretKey']);

	
?>
