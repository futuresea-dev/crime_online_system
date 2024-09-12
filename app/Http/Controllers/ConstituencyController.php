<?php

namespace App\Http\Controllers;

use App\Model\TotalWmc;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class ConstituencyController extends Controller
{

    /**
     * Show the application dashboard.
     *
     */
    public function index()
    {
        $page_content = app('GlobFunc')->getPageContent('constituency description');
        $type_location = "Constituencies";
        $sortorder = "DESC ";
        $bw_worst_selected = "checked";
        $bw_best_selected = "";
        $norpf_pf_selected = "checked";
        $norpf_n_selected = "";
        $location_all_selected = "checked";
        $location_postcode_selected = "";
        $report_title = "All constituencies in England, Wales and Northern Ireland, ordered by highest total crime ()";
        $report_type = "Rate";
        $data = array(
            'page_content' => $page_content,
            'type_location' => $type_location,
            'sort_order' => $sortorder,
            'report_type' => $report_type,
            'store' => null,
            'has_daypop' => true,
            'no_ha' => 0
        );
        return view('constituencies/constituencies', $data);
    }

//    return dataTables data
    public function getData(Request $request)
    {
        if($request->ajax()){
            if ($request->has('search'))
            $start = $request->input('start');
            $length = $request->input('length');

            $data = TotalWmc::selectRaw('
                mapit_constituent.name AS Constituency,
                total_wmc.wmc AS constituencyid,
                mapit_constituent.country,
                mapit_constituent.area,
                mapit_constituent.population,
                SUM(total_wmc.asb_total) AS asb_total,
                SUM(total_wmc.rob_total) AS rob_total,
                SUM(total_wmc.bur_total) AS bur_total,
                SUM(total_wmc.veh_total) AS veh_total,
                SUM(total_wmc.vio_total) AS vio_total,
                SUM(total_wmc.all_total) AS all_total,
                SUM(total_wmc.pdw_total) AS pdw_total,
                SUM(total_wmc.shop_total) AS shop_total,
                SUM(total_wmc.cda_total) AS cda_total,
                SUM(total_wmc.othertheft_total) AS othertheft_total,
                SUM(total_wmc.drug_total) AS drug_total,
                SUM(total_wmc.ord_total) AS ord_total,
                SUM(total_wmc.weap_total) AS weap_total,
                SUM(total_wmc.bike_total) AS bike_total,
                SUM(total_wmc.pers_total) AS pers_total,
                SUM(total_wmc.other_total) AS other_total
            ')
                ->join('mapit_constituent', 'mapit_constituent.id', '=', 'total_wmc.wmc')
                ->groupBy('mapit_constituent.name', 'total_wmc.wmc', 'mapit_constituent.country', 'mapit_constituent.area', 'mapit_constituent.population')
                ->orderBy('all_total', 'DESC');

            return  DataTables::of($data)->make(true);

        }
        return response()->json(array());
    }
}
