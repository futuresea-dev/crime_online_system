<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\GlobFunc;

class GlobalFunctionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('GlobFunc', function ($app) {
            return new GlobFunc();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
