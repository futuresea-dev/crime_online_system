<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HeaderController extends Controller
{
    public function getMeta()
    {
        $meta_title = "UKCrimeStats.com - The Leading Independent Crime Data Platform";
        $meta_desc = "Welcome to UK Crime Stats, the leading public resource for maps, analysis and reporting of monthly crime data in England and Wales, growing by 500,000 crimes a month";
        $metarr[0][0] = "index.php";
        $metarr[0][1] = "UKCrimeStats.com - The Leading Independent Crime Data Platform";
        $metarr[0][2] = "Welcome to UK Crime Stats, the leading public resource for maps, analysis and reporting of monthly crime data in England and Wales, growing by 500,000 crimes a month";
        $metarr[0][3] = "";
        $metarr[0][4] = "<meta property=\"og:type\"        content=\"city\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime in England and Wales\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[0][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[0][5] = "crime";

        $metarr[1][0] = "policeforce.php";
        $metarr[1][1] = "UKCrimeStats.com - ".str_replace("_", " ", $_GET['id']);
        $metarr[1][2] = "View latest crime figures, maps and statistics for ".str_replace("_", " ", $_GET['id'])." here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[1][3] = "";
        $metarr[1][4] = "";
        $metarr[1][5] = "crime in the ".str_replace("_", " ", $_GET['id'])." area";

        $metarr[2][0] = "constituency.php";
        $metarr[2][1] = "UKCrimeStats.com - $1";
        $metarr[2][2] = "View latest crime figures, maps and statistics for $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[2][3] = "SELECT name AS metaTitle FROM mapit_constituent WHERE id=".$_GET['id'];
        $metarr[2][4] = "";
        $metarr[2][5] = "crime within $1 Constituency";

        $metarr[3][0] = "neighbourhood.php";
        $metarr[3][1] = "UKCrimeStats.com - $1";
        $metarr[3][2] = "View latest crime figures, maps and statistics for $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[3][3] = "SELECT '$title' AS metaTitle";
        $metarr[3][4] = "<meta property=\"og:type\"        content=\"city\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime in $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[3][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[3][5] = "crime within $1 neighbourhood";

        $metarr[4][0] = "postcode_district.php";
        $metarr[4][1] = "UKCrimeStats.com - Postcode District ".$_GET['pc'];
        $metarr[4][2] = "View latest crime figures, maps and statistics for ".$_GET['pc']." here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[4][3] = "";
        $metarr[4][4] = "<meta property=\"og:type\"        content=\"city\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime in Postcode $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[4][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[4][5] = "crime within ".$_GET['pc'];

        $metarr[5][0] = "school.php";
        $metarr[5][1] = "UKCrimeStats.com - Crimes and ASB near $1";
        $metarr[5][2] = "View latest crime figures, maps and statistics near $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[5][3] = "SELECT s.name AS metaTitle FROM school s WHERE s.schoolid=".$_GET['id'];
        $metarr[5][4] = "<meta property=\"og:type\"        content=\"school\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime near $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[3][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[5][5] = "crime near $1";

        $metarr[6][0] = "subdivision.php";
        $metarr[6][1] = "UKCrimeStats.com - $1";
        $metarr[6][2] = "View latest crime figures, maps and statistics for $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[6][3] = "SELECT name AS metaTitle FROM ".$tablename." WHERE id=".$_GET['id'];
        $metarr[6][4] = "<meta property=\"og:type\"        content=\"government\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime in $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[3][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[6][5] = "crime in $1";

        $metarr[7][0] = "transport.php";
        $metarr[7][1] = "UKCrimeStats.com - Crimes and ASB near $1";
        $metarr[7][2] = "View latest crime figures, maps and statistics near $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[7][3] = "SELECT s.commonname AS metaTitle FROM stops s WHERE s.atcocode='".$_GET['code']."'";
        $metarr[7][4] = "<meta property=\"og:type\"        content=\"city\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime near $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[3][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[7][5] = "crime near $1";

        $metarr[8][0] = "poi.php";
        $metarr[8][1] = "UKCrimeStats.com - Crimes and ASB near $1";
        $metarr[8][2] = "View latest crime figures, maps and statistics near $1 here on UKCrimestats.com - the leading independent crime data platform.";
        $metarr[8][3] = "SELECT s.title AS metaTitle FROM poi s WHERE s.poiid='".$_GET['id']."'";
        $metarr[8][4] = "<meta property=\"og:type\"        content=\"city\" />\n
								  <meta property=\"og:url\"         content=\"http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']."\" />\n
								  <meta property=\"og:title\"       content=\"Crime near $1\" />\n
								  <meta property=\"og:description\" content=\"".$metarr[3][2]."\" />\n
								  <meta property=\"og:image\"       content=\"http://www.ukcrimestats.com/img/ukc16.png\" /> ";
        $metarr[8][5] = "crime near $1";

        $found_page = false;
        $facebook_prefix = "crime";
        for ($d=0;$d<count($metarr);$d++) {

            if (isPage($metarr[$d][0], $_SERVER['PHP_SELF'])) {

                $meta_title = $metarr[$d][1];
                $meta_desc = $metarr[$d][2];
                $facebook_prefix = $metarr[$d][5];

                if (!empty($metarr[$d][3])) {
                    $meta_result = mysql_query($metarr[$d][3]);
                    $meta_row = mysql_fetch_array($meta_result);

                    if ($meta_row) {
                        $meta_title = str_replace("$1", stripslashes($meta_row["metaTitle"]), $metarr[$d][1]);
                        $meta_desc = str_replace("$1", stripslashes($meta_row["metaTitle"]), $metarr[$d][2]);
                        $meta_facebook = str_replace("$1", stripslashes($meta_row["metaTitle"]), $metarr[$d][4]);
                        $facebook_prefix = str_replace("$1", stripslashes($meta_row["metaTitle"]), $metarr[$d][5]);
                    }
                }

                break;
            }

        }
    }
}
