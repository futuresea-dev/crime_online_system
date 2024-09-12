<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HeaderServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
//        view()->composer('layouts.header', function($view) {
//            $page = ''
//            $id = request()->input('id');
//            $meta = MetaModel::getMeta($page, $id);
//            $view->with($meta);
//        });
    }
}
