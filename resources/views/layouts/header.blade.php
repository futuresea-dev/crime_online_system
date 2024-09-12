        <head>
            <meta charset="UTF-8">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="author" content="UKcrimestats">

            <!--Info for google plus login -->
            <meta name="google-signin-scope" content="profile email">
            <meta name="google-signin-client_id" content="324041630410-stooiuaaa5ts7bir94i8qe68kln9r9vb.apps.googleusercontent.com">
            <script src="https://connect.facebook.net/en_US/all.js?hash=b6b9383842bf65bd31549fccc68e0418" async="" crossorigin="anonymous"></script><script type="text/javascript" async="" src="https://ssl.google-analytics.com/ga.js"></script><script id="facebook-jssdk" src="//connect.facebook.net/en_US/all.js#xfbml=1&amp;appId=163120147122737"></script><script type="text/javascript" src="https://www.ukcrimestats.com/js/googlePlusSignIn.js"></script>
            <script src="https://apis.google.com/js/platform.js" async="" defer="" gapi_processed="true"></script>
            <title>UKCrimeStats.com - The Leading Independent Crime Data Platform</title>
            <meta name="description" content="Welcome to UK Crime Stats, the leading public resource for maps, analysis and reporting of monthly crime data in England and Wales, growing by 500,000 crimes a month">
            <!-- Bootstrap Core CSS -->
            <link href="https://www.ukcrimestats.com/xcss/bootstrap.min.css?version=2" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/xcss/style.css?v=331.3" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/xcss/override.css?v=1.2" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/xcss/responsive.css?v=1.1" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/xcss/jquery-ui.css" type="text/css" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'" media="all">
            <link href="https://www.ukcrimestats.com/css/jquery.twitter.css" type="text/css" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/css/tablesorterstyle.css?v=2" type="text/css" rel="stylesheet" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <link href="https://www.ukcrimestats.com/css/custom.css" type="text/css" rel="stylesheet">
            <link href="https://www.ukcrimestats.com/libs/toastr/toastr.min.css" type="text/css" rel="stylesheet">
{{--            data table--}}
            <link href="https://cdn.datatables.net/2.1.5/css/dataTables.dataTables.min.css" type="text/css" rel="stylesheet">

            <!-- Custom CSS -->
            <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
            <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
            <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
            <![endif]-->
            <!--[if IE]>
            <link href="css/style.IE.css" rel="stylesheet">
            <![endif]-->
            <script>

                <!-- Google tag (gtag.js) -->
                <script async src='https://www.googletagmanager.com/gtag/js?id=G-8DPS0E1CG7'></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-8DPS0E1CG7');
            </script>

            <style>.adsbygoogle {display:none !important} </style>
            <!-- jQuery Version 1.11.3 -->
            <script src="https://www.ukcrimestats.com/xjs/jquery-1.11.3.min.js"></script>
            <!-- Bootstrap Core JavaScript -->
            <script src="https://www.ukcrimestats.com/xjs/bootstrap.min.js" async="" defer=""></script>

            <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js" type="text/javascript"></script>
            <script rel="preload" type="text/javascript" src="https://js.stripe.com/v3/"></script>
            <script src="https://www.ukcrimestats.com/js/jquery.dropdownPlain.js" type="text/javascript"></script>

            <script type="text/javascript" src="https://www.ukcrimestats.com/js/jquery.tablesorter.min.js"></script>
            <script type="text/javascript" src="https://www.ukcrimestats.com/js/jquery.tablehover.js"></script>
            <script type="text/javascript" src="https://www.ukcrimestats.com/js/jquery.metadata.js" async="" defer=""></script>
            <script type="text/javascript" src="https://www.ukcrimestats.com/libs/toastr/toastr.min.js" async="" defer=""></script>

            <script type="text/javascript" src="https://www.ukcrimestats.com/js/jquery.collapser.js"></script>
            <script type="text/javascript" src="https://www.ukcrimestats.com/js/site.js?v=423"></script>
            <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
            <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
            <!--<script type="text/javascript" src="https://www.ukcrimestats.com/js/markercluster.js"></script>-->
            <script src="https://www.ukcrimestats.com//xjs/bootstrap-hover-dropdown.min.js"> </script>
            <script src="https://www.ukcrimestats.com/xjs/custom.script.js?v=1.1" async="" defer="">	</script>
{{--data tables--}}
            <script src="https://cdn.datatables.net/2.1.5/js/dataTables.min.js"></script>
            <!-- PayPal BEGIN -->
            <script>
                // ;(function(a,t,o,m,s){a[m]=a[m]||[];a[m].push({t:new Date().getTime(),event:'snippetRun'});var f=t.getElementsByTagName(o)[0],e=t.createElement(o),d=m!=='paypalDDL'?'&m='+m:'';e.async=!0;e.src='https://www.paypal.com/tagmanager/pptm.js?id='+s+d;f.parentNode.insertBefore(e,f);})(window,document,'script','paypalDDL','077bfe89-c047-4df5-b28d-0ee6cc451ca3');
            </script>
            <!-- PayPal END -->
            <script>
                var my_href = "https://www.ukcrimestats.com/";
                $(document).ready(function()
                    {
                        $(".memberfield, .emailfield").focus(function(){
                            $(this).css("color", "black");
                            $(this).val("");
                        });
                        $(".memberfield").blur(function(){
                            if(!$.trim(this.value).length) {
                                $(this).css("color", "gray");
                                $(this).val($(this).data("placehold"));
                            }
                        });
                        $(".emailfield").blur(function(){
                            if(!$.trim(this.value).length) {
                                $(this).css("color", "gray");
                                $(this).val($(this).data("placehold"));
                            }
                            else {
                                $.getJSON("http://www.ukcrimestats.com/testEmail.php", { email : $(this).val() }, function(data){
                                    if (data.exists){
                                        $(".renewal").show();
                                        $("#renewal_pwd").focus();
                                        $(".norenewal").hide();
                                    }
                                    else{
                                        $("#renewal_pwd").val("");
                                        $(".renewal").hide();
                                        $(".norenewal").show();
                                    }
                                })
                            }
                        })
                        $(".pwd_placehold").focus(function(){
                            $($(this).data("twin")).show();
                            $($(this).data("twin")).focus();
                            $(this).hide();
                        });
                        /*
                           $(".memberpwd").blur(function(){
                                        if(!$.trim(this.value).length) {
                                           $($(this).data("twin")).show();
                                           $(this).hide();
                                        }
                           });
                           */
                        var policeform = document.forms['policeform'];
                        var twitteruser = null;

                        if(typeof(policeform) !== 'undefined' && policeform != null) {
                            twitteruser = policeform.twitteruser.value;
                        }
                        $('.tablesorter').tableHover({colClass: 'hover', cellClass: 'hovercell', clickClass: 'click'});
                        $('.tablesorter').tablesorter({
                            // Define a custom function to ignore the comma
                            textExtraction: function(node) {
                                var in_a = $(node).find("a").text();
                                if (in_a) {
                                    return in_a.replace(/,/g,'');
                                }
                                return node.innerHTML.replace(/,/g,'');
                            },
                            type: 'numeric'
                        });

                        $('.collapsiblediv').collapser({
                            target: 'next',
                            targetOnly: 'div',
                            expandHtml: 'Show Search',
                            collapseHtml: 'Hide Search'

                        });

                        $('.collapsible_street').collapser({
                            target: 'next',
                            targetOnly: 'div',
                            expandHtml: 'Show individual crimes',
                            collapseHtml: 'Hide individual crimes'

                        });

                        if (typeof(montharr_title)!='undefined')
                        {
                            $( "#slider" ).slider({
                                value: 0,
                                min: 0,
                                max: montharr_title.length-1,
                                step: 1,
                                slide: function( event, ui ) {
                                    $("#slider_text").val(montharr_title[ui.value]);
                                    $("#slider_val").val(montharr_val[ui.value]);
                                },
                                change: function( event, ui) {
                                    heatmap_display_change(heatmapArr[montharr_val[ui.value]]);
                                }
                            });

                            $("#slider_text").val( montharr_title[0] );
                            $("#slider_val").val( montharr_val[0] );
                        }


                    }
                );
                function toggleSubdivPop(sub) {

                    //console.log(sub.options[sub.selectedIndex].value);
                    if (["DIW", "LBW", "MTW", "UTE", "UTW"].indexOf(sub.options[sub.selectedIndex].value) >= 0){
                        $(".daypop_op").show();

                        //else
                        //	$("#daypop_op").show();
                    }
                    else {

                        $(".daypop_op").hide();
                        //console.log("Yo no soy el marisco.")
                    }
                    if (["MTD", "CED", "DIS", "CTY", "LBO", "UTA","WAC","GLA","LAC","PRW" ].indexOf(sub.options[sub.selectedIndex].value) >= 0){

                        $(".ha").show();
                    }
                    else {
                        $(".ha").hide();
                        qt = document.getElementsByName("qt")[1];
                        if (qt.selectedIndex > 1)
                            qt.selectedIndex = 0;
                    }


                }
            </script>

            <script type="text/javascript" src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5419f33f24a8b4fa" async="" defer=""></script><style type="text/css" data-fbcssmodules="css:fb.css.base css:fb.css.dialog css:fb.css.iframewidget css:fb.css.customer_chat_plugin_iframe">.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:'lucida grande', tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}@keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}
                .fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:'lucida grande', tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}@keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}
                .fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https://connect.facebook.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https://connect.facebook.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https://connect.facebook.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://connect.facebook.net/rsrc.php/v3/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50%;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100%;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100%}.fb_dialog.fb_dialog_mobile.loading{background:url(https://connect.facebook.net/rsrc.php/v3/ya/r/3rhSv5V8j3o.gif) white no-repeat 50% 50%;min-height:100%;min-width:100%;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100%}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100%;position:absolute;right:0;top:0;width:100%;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100%}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https://connect.facebook.net/rsrc.php/v3/y9/r/jKEcVPZFk-2.gif) no-repeat 50% 50%;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://connect.facebook.net/rsrc.php/v3/yD/r/t-wz8gw1xG1.png);background-position:50% 50%;background-repeat:no-repeat;height:24px;width:24px}@keyframes rotateSpinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
                .fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100%}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100%}
                .fb_mpn_mobile_landing_page_slide_out{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_out_from_left{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out_from_left;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_up{animation-duration:500ms;animation-name:fb_mpn_landing_page_slide_up;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_in{animation-duration:300ms;animation-name:fb_mpn_bounce_in;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out{animation-duration:300ms;animation-name:fb_mpn_bounce_out;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out_v2{animation-duration:300ms;animation-name:fb_mpn_fade_out;transition-timing-function:ease-in}.fb_customer_chat_bounce_in_v2{animation-duration:300ms;animation-name:fb_bounce_in_v2;transition-timing-function:ease-in}.fb_customer_chat_bounce_in_from_left{animation-duration:300ms;animation-name:fb_bounce_in_from_left;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_v2{animation-duration:300ms;animation-name:fb_bounce_out_v2;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_from_left{animation-duration:300ms;animation-name:fb_bounce_out_from_left;transition-timing-function:ease-in}.fb_invisible_flow{display:inherit;height:0;overflow-x:hidden;width:0}@keyframes fb_mpn_landing_page_slide_out{0%{margin:0 12px;width:100% - 24px}60%{border-radius:18px}100%{border-radius:50%;margin:0 24px;width:60px}}@keyframes fb_mpn_landing_page_slide_out_from_left{0%{left:12px;width:100% - 24px}60%{border-radius:18px}100%{border-radius:50%;left:12px;width:60px}}@keyframes fb_mpn_landing_page_slide_up{0%{bottom:0;opacity:0}100%{bottom:24px;opacity:1}}@keyframes fb_mpn_bounce_in{0%{opacity:.5;top:100%}100%{opacity:1;top:0}}@keyframes fb_mpn_fade_out{0%{bottom:30px;opacity:1}100%{bottom:0;opacity:0}}@keyframes fb_mpn_bounce_out{0%{opacity:1;top:0}100%{opacity:.5;top:100%}}@keyframes fb_bounce_in_v2{0%{opacity:0;transform:scale(0, 0);transform-origin:bottom right}50%{transform:scale(1.03, 1.03);transform-origin:bottom right}100%{opacity:1;transform:scale(1, 1);transform-origin:bottom right}}@keyframes fb_bounce_in_from_left{0%{opacity:0;transform:scale(0, 0);transform-origin:bottom left}50%{transform:scale(1.03, 1.03);transform-origin:bottom left}100%{opacity:1;transform:scale(1, 1);transform-origin:bottom left}}@keyframes fb_bounce_out_v2{0%{opacity:1;transform:scale(1, 1);transform-origin:bottom right}100%{opacity:0;transform:scale(0, 0);transform-origin:bottom right}}@keyframes fb_bounce_out_from_left{0%{opacity:1;transform:scale(1, 1);transform-origin:bottom left}100%{opacity:0;transform:scale(0, 0);transform-origin:bottom left}}@keyframes slideInFromBottom{0%{opacity:.1;transform:translateY(100%)}100%{opacity:1;transform:translateY(0)}}@keyframes slideInFromBottomDelay{0%{opacity:0;transform:translateY(100%)}97%{opacity:0;transform:translateY(100%)}100%{opacity:1;transform:translateY(0)}}</style></head>
