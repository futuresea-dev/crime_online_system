<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class GlobFunc
{
    public function mysql_get_value($query){
        $result = DB::select($query);
        return $result[0]->{"0"} ?? null;
    }
    public function getPageContent($title){
        return str_replace('src="http:', 'src="https:', str_replace("src='http:", "src='https", $this->mysql_get_value("select post_content from ukcrimes_wp1.wp_posts where post_type = 'page' and post_title = '$title'" )));
    }
}
