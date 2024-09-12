@extends('layouts.app')

@section('content')
    <style>
        .tablet {display: none;}
        @media (max-width: 1000px) {
            .tablet {display: block;}
            .computer {display: none;}
        }

    </style>
    <div id="page-desc">
        <div class="addthis_sharing_toolbox"></div>
        <div class="desc-content">
            {{ $page_content }}
            <div class="clear"></div>
        </div>
    </div>
    <div class="row">
        <div class="container">
            <div class="col-lg-12">
    @include('include.banner2')
                <div class="tablet">
                    <!--<a class="btn btn-primary btn-xs" role="button" data-toggle="collapse" href="#crimeform" aria-expanded="true" aria-controls="crimeform">
                    Hide Search
                </a>-->

                    <div id="crimeform" class="row collapse in search-panel" aria-expanded="true">
                        <form action="http://localhost/Constituencies/" method="POST" name="theform">

                            <div class="form-input col-lg-12">
                                <h4>Show me:</h4>
                            </div>

                            <!--<select name="qt" onchange="toggleDate(this.value)">
                            <option value="Total">Total Crime</option>
                            <option value="Rate" >Crime Rate</option>
                            <option value="Percentile" >Percentile</option>
                    </select>
                    in a
                    <select name="radius">
                            <option value = "">1 Mile Radius</option>
                            <option value = "1hm" >1/2 Mile Radius</option>
                            <option value = "1qm" >1/4 Mile Radius</option>
                    </select>-->
                            <div class="form-inline col-lg-6 col-md-6">
                                <select name="sortorder" style="font-size:9pt;" class="form-control input-sm">
                                    <option value="DESC" id="bw_first">Highest</option>
                                    <option value="ASC">Lowest</option>
                                </select>
                                <select name="qt" style="font-size:9pt;" class="form-control input-sm">
                                    <option value="Total">Total Crime</option>
                                    <option value="Rate">Crime Rate</option>
                                    <option class="ha" value="Density">Crime per Hectare</option>
                                    <option class="ha" value="DensityRate">Crime rate per Hectare</option>
                                </select>



                                <div style="margin-top:5px"><input type="radio" name="pop_type" value="residential" class="pop_op" checked="" data-has-listeners="true">Use <select name="census_year"><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option></select> residential population   &nbsp; <input type="radio" name="pop_type" value="daytime" class="pop_op" data-has-listeners="true">Use daytime population</div>									<br><br>
                            </div>

                            <div class="form-inline col-lg-6 col-md-6">
                                <label for="startmonth"> Between: </label>
                                <select name="startmonth" class="form-control input-sm" style="font-size:9pt;"><option value="">Select Start Month</option><option value="1">December 2010</option><option value="2">January 2011</option><option value="3">February 2011</option><option value="4">March 2011</option><option value="5">April 2011</option><option value="6">May 2011</option><option value="7">June 2011</option><option value="8">July 2011</option><option value="9">August 2011</option><option value="10">September 2011</option><option value="11">October 2011</option><option value="12">November 2011</option><option value="13">December 2011</option><option value="14">January 2012</option><option value="15">February 2012</option><option value="16">March 2012</option><option value="17">April 2012</option><option value="18">May 2012</option><option value="19">June 2012</option><option value="20">July 2012</option><option value="21">August 2012</option><option value="22">September 2012</option><option value="23">October 2012</option><option value="24">November 2012</option><option value="25">December 2012</option><option value="26">January 2013</option><option value="27">February 2013</option><option value="28">March 2013</option><option value="29">April 2013</option><option value="30">May 2013</option><option value="31">June 2013</option><option value="32">July 2013</option><option value="33">August 2013</option><option value="34">September 2013</option><option value="35">October 2013</option><option value="36">November 2013</option><option value="37">December 2013</option><option value="38">January 2014</option><option value="39">February 2014</option><option value="40">March 2014</option><option value="42">April 2014</option><option value="43">May 2014</option><option value="44">June 2014</option><option value="45">July 2014</option><option value="46">August 2014</option><option value="47">September 2014</option><option value="48">October 2014</option><option value="49">November 2014</option><option value="50">December 2014</option><option value="51">January 2015</option><option value="52">February 2015</option><option value="53">March 2015</option><option value="54">April 2015</option><option value="55">May 2015</option><option value="56">June 2015</option><option value="57">July 2015</option><option value="58">August 2015</option><option value="59">September 2015</option><option value="60">October 2015</option><option value="61">November 2015</option><option value="62">December 2015</option><option value="63">January 2016</option><option value="64">February 2016</option><option value="65">March 2016</option><option value="66">April 2016</option><option value="67">May 2016</option><option value="68">June 2016</option><option value="69">July 2016</option><option value="70">August 2016</option><option value="71">September 2016</option><option value="72">October 2016</option><option value="73">November 2016</option><option value="74">December 2016</option><option value="75">January 2017</option><option value="76">February 2017</option><option value="77">March 2017</option><option value="78">April 2017</option><option value="79">May 2017</option><option value="80">June 2017</option><option value="81">July 2017</option><option value="82">August 2017</option><option value="83">September 2017</option><option value="84">October 2017</option><option value="85">November 2017</option><option value="86">December 2017</option><option value="87">January 2018</option><option value="88">February 2018</option><option value="89">March 2018</option><option value="90">April 2018</option><option value="92">May 2018</option><option value="93">June 2018</option><option value="94">July 2018</option><option value="95">August 2018</option><option value="96">September 2018</option><option value="97">October 2018</option><option value="98">November 2018</option><option value="99">December 2018</option><option value="100">January 2019</option><option value="101">February 2019</option><option value="102">March 2019</option><option value="103">April 2019</option><option value="104">May 2019</option><option value="105">June 2019</option><option value="106">July 2019</option><option value="107">August 2019</option><option value="108">September 2019</option><option value="109">October 2019</option><option value="110">November 2019</option><option value="111">December 2019</option><option value="112">January 2020</option><option value="113">February 2020</option><option value="114">March 2020</option><option value="115">April 2020</option><option value="116">May 2020</option><option value="117">June 2020</option><option value="118">July 2020</option><option value="119">August 2020</option><option value="120">September 2020</option><option value="121">October 2020</option><option value="122">November 2020</option><option value="123">December 2020</option><option value="124">January 2021</option><option value="125">February 2021</option><option value="126">March 2021</option><option value="127">April 2021</option><option value="128">May 2021</option><option value="129">June 2021</option><option value="130">July 2021</option><option value="131">August 2021</option><option value="132">September 2021</option><option value="133">October 2021</option><option value="134">November 2021</option><option value="135">December 2021</option><option value="136">January 2022</option><option value="137">February 2022</option><option value="138">March 2022</option><option value="139">April 2022</option><option value="140">May 2022</option><option value="141">June 2022</option><option value="142">July 2022</option><option value="143">August 2022</option><option value="144">September 2022</option><option value="145">October 2022</option><option value="146">November 2022</option><option value="147">December 2022</option><option value="148">January 2023</option><option value="149">February 2023</option><option value="150">March 2023</option><option value="151">April 2023</option><option value="152">May 2023</option><option value="153">June 2023</option><option value="154">July 2023</option><option value="155">August 2023</option><option value="156">September 2023</option><option value="157">October 2023</option><option value="158">November 2023</option><option value="159">December 2023</option><option value="160">January 2024</option><option value="161">February 2024</option><option value="162">March 2024</option><option value="163">April 2024</option><option value="164">May 2024</option><option value="165" selected="">June 2024</option></select>
                                <label for="startmonth"> and </label>
                                <select name="endmonth" class="form-control input-sm" style="font-size:9pt;"><option value="">Select End Month</option><option value="1">December 2010</option><option value="2">January 2011</option><option value="3">February 2011</option><option value="4">March 2011</option><option value="5">April 2011</option><option value="6">May 2011</option><option value="7">June 2011</option><option value="8">July 2011</option><option value="9">August 2011</option><option value="10">September 2011</option><option value="11">October 2011</option><option value="12">November 2011</option><option value="13">December 2011</option><option value="14">January 2012</option><option value="15">February 2012</option><option value="16">March 2012</option><option value="17">April 2012</option><option value="18">May 2012</option><option value="19">June 2012</option><option value="20">July 2012</option><option value="21">August 2012</option><option value="22">September 2012</option><option value="23">October 2012</option><option value="24">November 2012</option><option value="25">December 2012</option><option value="26">January 2013</option><option value="27">February 2013</option><option value="28">March 2013</option><option value="29">April 2013</option><option value="30">May 2013</option><option value="31">June 2013</option><option value="32">July 2013</option><option value="33">August 2013</option><option value="34">September 2013</option><option value="35">October 2013</option><option value="36">November 2013</option><option value="37">December 2013</option><option value="38">January 2014</option><option value="39">February 2014</option><option value="40">March 2014</option><option value="42">April 2014</option><option value="43">May 2014</option><option value="44">June 2014</option><option value="45">July 2014</option><option value="46">August 2014</option><option value="47">September 2014</option><option value="48">October 2014</option><option value="49">November 2014</option><option value="50">December 2014</option><option value="51">January 2015</option><option value="52">February 2015</option><option value="53">March 2015</option><option value="54">April 2015</option><option value="55">May 2015</option><option value="56">June 2015</option><option value="57">July 2015</option><option value="58">August 2015</option><option value="59">September 2015</option><option value="60">October 2015</option><option value="61">November 2015</option><option value="62">December 2015</option><option value="63">January 2016</option><option value="64">February 2016</option><option value="65">March 2016</option><option value="66">April 2016</option><option value="67">May 2016</option><option value="68">June 2016</option><option value="69">July 2016</option><option value="70">August 2016</option><option value="71">September 2016</option><option value="72">October 2016</option><option value="73">November 2016</option><option value="74">December 2016</option><option value="75">January 2017</option><option value="76">February 2017</option><option value="77">March 2017</option><option value="78">April 2017</option><option value="79">May 2017</option><option value="80">June 2017</option><option value="81">July 2017</option><option value="82">August 2017</option><option value="83">September 2017</option><option value="84">October 2017</option><option value="85">November 2017</option><option value="86">December 2017</option><option value="87">January 2018</option><option value="88">February 2018</option><option value="89">March 2018</option><option value="90">April 2018</option><option value="92">May 2018</option><option value="93">June 2018</option><option value="94">July 2018</option><option value="95">August 2018</option><option value="96">September 2018</option><option value="97">October 2018</option><option value="98">November 2018</option><option value="99">December 2018</option><option value="100">January 2019</option><option value="101">February 2019</option><option value="102">March 2019</option><option value="103">April 2019</option><option value="104">May 2019</option><option value="105">June 2019</option><option value="106">July 2019</option><option value="107">August 2019</option><option value="108">September 2019</option><option value="109">October 2019</option><option value="110">November 2019</option><option value="111">December 2019</option><option value="112">January 2020</option><option value="113">February 2020</option><option value="114">March 2020</option><option value="115">April 2020</option><option value="116">May 2020</option><option value="117">June 2020</option><option value="118">July 2020</option><option value="119">August 2020</option><option value="120">September 2020</option><option value="121">October 2020</option><option value="122">November 2020</option><option value="123">December 2020</option><option value="124">January 2021</option><option value="125">February 2021</option><option value="126">March 2021</option><option value="127">April 2021</option><option value="128">May 2021</option><option value="129">June 2021</option><option value="130">July 2021</option><option value="131">August 2021</option><option value="132">September 2021</option><option value="133">October 2021</option><option value="134">November 2021</option><option value="135">December 2021</option><option value="136">January 2022</option><option value="137">February 2022</option><option value="138">March 2022</option><option value="139">April 2022</option><option value="140">May 2022</option><option value="141">June 2022</option><option value="142">July 2022</option><option value="143">August 2022</option><option value="144">September 2022</option><option value="145">October 2022</option><option value="146">November 2022</option><option value="147">December 2022</option><option value="148">January 2023</option><option value="149">February 2023</option><option value="150">March 2023</option><option value="151">April 2023</option><option value="152">May 2023</option><option value="153">June 2023</option><option value="154">July 2023</option><option value="155">August 2023</option><option value="156">September 2023</option><option value="157">October 2023</option><option value="158">November 2023</option><option value="159">December 2023</option><option value="160">January 2024</option><option value="161">February 2024</option><option value="162">March 2024</option><option value="163">April 2024</option><option value="164">May 2024</option><option value="165">June 2024</option></select>
                                <br><br>
                            </div>

                            <div class="form-input col-lg-12">
                                <label for="startmonth"> Include: </label>
                                <div class="selectall">
                                    <a href="javascript:void($(&quot;[name='chkCrimeTypes[]']&quot;).prop('checked', true));">Select all</a> | <a href="javascript:void($(&quot;[name='chkCrimeTypes[]']&quot;).prop('checked', false));">Unselect all</a>
                                </div>
                                <div class="form-input col-lg-12 col-md-12"><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="1" checked="" data-has-listeners="true">&nbsp;Anti-social behaviour</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="2" checked="" data-has-listeners="true">&nbsp;Burglary</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="4" checked="" data-has-listeners="true">&nbsp;Robbery</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="5" checked="" data-has-listeners="true">&nbsp;Vehicle crime</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="6" checked="" data-has-listeners="true">&nbsp;Violence and sexual offences</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="8" data-has-listeners="true">&nbsp;Public Disorder and Weapons</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="9" checked="" data-has-listeners="true">&nbsp;Shoplifting</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="10" checked="" data-has-listeners="true">&nbsp;Criminal Damage and Arson</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="11" checked="" data-has-listeners="true">&nbsp;Other Theft</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="12" checked="" data-has-listeners="true">&nbsp;Drugs</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="3" checked="" data-has-listeners="true">&nbsp;Other crime</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="13" checked="" data-has-listeners="true">&nbsp;Bicycle theft</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="15" checked="" data-has-listeners="true">&nbsp;Possession of weapons</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="16" checked="" data-has-listeners="true">&nbsp;Public order</label><label class="checkbox-inline no_indent"><input type="checkbox" name="chkCrimeTypes[]" value="14" checked="" data-has-listeners="true">&nbsp;Theft from the person</label></div>								<div class="clear"></div>
                                <br>
                            </div>

                            <div class="form-input col-lg-12">
                                <input type="submit" class="btnSubmit btn btn-sm btn-primary" name="btnCrimeDbSubmit" value="Get Report" data-has-listeners="true">&nbsp;
                                <input type="submit" name="btnCrimeDbReset" class="btnSubmit btn btn-sm" value="Reset" data-has-listeners="true">&nbsp;&nbsp;
                                <br>		<input type="checkbox" name="chkExcel" value="1" data-has-listeners="true">&nbsp;<img src="http://localhost/img/excel.gif" border="0" width="16px">&nbsp;Export all results to Excel
                            </div>

                        </form>
                        <div class="clear"></div>
                        <br><br>
                    </div>
                </div>

                <div class="computer">
                    <a class="btn btn-primary btn-xs" role="button" data-toggle="collapse" href="#crimeform" aria-expanded="true" aria-controls="crimeform">
                        Hide Search
                    </a>

                    <div id="crimeform" class="row collapse in search-panel" aria-expanded="true">
                        <form action="http://localhost/Constituencies/" method="POST" name="theform">

                            <table width="100%" cellspacing="5" cellpadding="2" border="0">

                                <tbody><tr valign="top">
                                    <td>
                                        <font class="heading" name="theform">Show me:</font>

                                        <table width="100%" cellspacing="0" cellpadding="2" border="0">
                                            <tbody><tr valign="top">
                                                <td class="celldata" width="300px">
                                                    <select name="bw">
                                                        <option value="Highest" id="bw_first" checked="">Highest</option>
                                                        <option value="Lowest">Lowest</option>
                                                    </select>
                                                    <select name="qt">
                                                        <option value="Total">Total Crime</option>
                                                        <option value="Rate">Crime Rate</option>
                                                        <option class="ha" value="Density">Crime per Hectare</option>
                                                        <option class="ha" value="DensityRate">Crime rate per Hectare</option>
                                                    </select>
                                                </td>
                                                <td class="celldata" width="350px">
                                                    <font class="heading">Between:</font>&nbsp;<select name="startmonth" style="font-size:9pt;"><option value="">Select Start Month</option><option value="1">December 2010</option><option value="2">January 2011</option><option value="3">February 2011</option><option value="4">March 2011</option><option value="5">April 2011</option><option value="6">May 2011</option><option value="7">June 2011</option><option value="8">July 2011</option><option value="9">August 2011</option><option value="10">September 2011</option><option value="11">October 2011</option><option value="12">November 2011</option><option value="13">December 2011</option><option value="14">January 2012</option><option value="15">February 2012</option><option value="16">March 2012</option><option value="17">April 2012</option><option value="18">May 2012</option><option value="19">June 2012</option><option value="20">July 2012</option><option value="21">August 2012</option><option value="22">September 2012</option><option value="23">October 2012</option><option value="24">November 2012</option><option value="25">December 2012</option><option value="26">January 2013</option><option value="27">February 2013</option><option value="28">March 2013</option><option value="29">April 2013</option><option value="30">May 2013</option><option value="31">June 2013</option><option value="32">July 2013</option><option value="33">August 2013</option><option value="34">September 2013</option><option value="35">October 2013</option><option value="36">November 2013</option><option value="37">December 2013</option><option value="38">January 2014</option><option value="39">February 2014</option><option value="40">March 2014</option><option value="42">April 2014</option><option value="43">May 2014</option><option value="44">June 2014</option><option value="45">July 2014</option><option value="46">August 2014</option><option value="47">September 2014</option><option value="48">October 2014</option><option value="49">November 2014</option><option value="50">December 2014</option><option value="51">January 2015</option><option value="52">February 2015</option><option value="53">March 2015</option><option value="54">April 2015</option><option value="55">May 2015</option><option value="56">June 2015</option><option value="57">July 2015</option><option value="58">August 2015</option><option value="59">September 2015</option><option value="60">October 2015</option><option value="61">November 2015</option><option value="62">December 2015</option><option value="63">January 2016</option><option value="64">February 2016</option><option value="65">March 2016</option><option value="66">April 2016</option><option value="67">May 2016</option><option value="68">June 2016</option><option value="69">July 2016</option><option value="70">August 2016</option><option value="71">September 2016</option><option value="72">October 2016</option><option value="73">November 2016</option><option value="74">December 2016</option><option value="75">January 2017</option><option value="76">February 2017</option><option value="77">March 2017</option><option value="78">April 2017</option><option value="79">May 2017</option><option value="80">June 2017</option><option value="81">July 2017</option><option value="82">August 2017</option><option value="83">September 2017</option><option value="84">October 2017</option><option value="85">November 2017</option><option value="86">December 2017</option><option value="87">January 2018</option><option value="88">February 2018</option><option value="89">March 2018</option><option value="90">April 2018</option><option value="92">May 2018</option><option value="93">June 2018</option><option value="94">July 2018</option><option value="95">August 2018</option><option value="96">September 2018</option><option value="97">October 2018</option><option value="98">November 2018</option><option value="99">December 2018</option><option value="100">January 2019</option><option value="101">February 2019</option><option value="102">March 2019</option><option value="103">April 2019</option><option value="104">May 2019</option><option value="105">June 2019</option><option value="106">July 2019</option><option value="107">August 2019</option><option value="108">September 2019</option><option value="109">October 2019</option><option value="110">November 2019</option><option value="111">December 2019</option><option value="112">January 2020</option><option value="113">February 2020</option><option value="114">March 2020</option><option value="115">April 2020</option><option value="116">May 2020</option><option value="117">June 2020</option><option value="118">July 2020</option><option value="119">August 2020</option><option value="120">September 2020</option><option value="121">October 2020</option><option value="122">November 2020</option><option value="123">December 2020</option><option value="124">January 2021</option><option value="125">February 2021</option><option value="126">March 2021</option><option value="127">April 2021</option><option value="128">May 2021</option><option value="129">June 2021</option><option value="130">July 2021</option><option value="131">August 2021</option><option value="132">September 2021</option><option value="133">October 2021</option><option value="134">November 2021</option><option value="135">December 2021</option><option value="136">January 2022</option><option value="137">February 2022</option><option value="138">March 2022</option><option value="139">April 2022</option><option value="140">May 2022</option><option value="141">June 2022</option><option value="142">July 2022</option><option value="143">August 2022</option><option value="144">September 2022</option><option value="145">October 2022</option><option value="146">November 2022</option><option value="147">December 2022</option><option value="148">January 2023</option><option value="149">February 2023</option><option value="150">March 2023</option><option value="151">April 2023</option><option value="152">May 2023</option><option value="153">June 2023</option><option value="154">July 2023</option><option value="155">August 2023</option><option value="156">September 2023</option><option value="157">October 2023</option><option value="158">November 2023</option><option value="159">December 2023</option><option value="160">January 2024</option><option value="161">February 2024</option><option value="162">March 2024</option><option value="163">April 2024</option><option value="164">May 2024</option><option value="165" selected="">June 2024</option></select>&nbsp;and&nbsp;
                                                    <select name="endmonth" style="font-size:9pt;"><option value="">Select End Month</option><option value="1">December 2010</option><option value="2">January 2011</option><option value="3">February 2011</option><option value="4">March 2011</option><option value="5">April 2011</option><option value="6">May 2011</option><option value="7">June 2011</option><option value="8">July 2011</option><option value="9">August 2011</option><option value="10">September 2011</option><option value="11">October 2011</option><option value="12">November 2011</option><option value="13">December 2011</option><option value="14">January 2012</option><option value="15">February 2012</option><option value="16">March 2012</option><option value="17">April 2012</option><option value="18">May 2012</option><option value="19">June 2012</option><option value="20">July 2012</option><option value="21">August 2012</option><option value="22">September 2012</option><option value="23">October 2012</option><option value="24">November 2012</option><option value="25">December 2012</option><option value="26">January 2013</option><option value="27">February 2013</option><option value="28">March 2013</option><option value="29">April 2013</option><option value="30">May 2013</option><option value="31">June 2013</option><option value="32">July 2013</option><option value="33">August 2013</option><option value="34">September 2013</option><option value="35">October 2013</option><option value="36">November 2013</option><option value="37">December 2013</option><option value="38">January 2014</option><option value="39">February 2014</option><option value="40">March 2014</option><option value="42">April 2014</option><option value="43">May 2014</option><option value="44">June 2014</option><option value="45">July 2014</option><option value="46">August 2014</option><option value="47">September 2014</option><option value="48">October 2014</option><option value="49">November 2014</option><option value="50">December 2014</option><option value="51">January 2015</option><option value="52">February 2015</option><option value="53">March 2015</option><option value="54">April 2015</option><option value="55">May 2015</option><option value="56">June 2015</option><option value="57">July 2015</option><option value="58">August 2015</option><option value="59">September 2015</option><option value="60">October 2015</option><option value="61">November 2015</option><option value="62">December 2015</option><option value="63">January 2016</option><option value="64">February 2016</option><option value="65">March 2016</option><option value="66">April 2016</option><option value="67">May 2016</option><option value="68">June 2016</option><option value="69">July 2016</option><option value="70">August 2016</option><option value="71">September 2016</option><option value="72">October 2016</option><option value="73">November 2016</option><option value="74">December 2016</option><option value="75">January 2017</option><option value="76">February 2017</option><option value="77">March 2017</option><option value="78">April 2017</option><option value="79">May 2017</option><option value="80">June 2017</option><option value="81">July 2017</option><option value="82">August 2017</option><option value="83">September 2017</option><option value="84">October 2017</option><option value="85">November 2017</option><option value="86">December 2017</option><option value="87">January 2018</option><option value="88">February 2018</option><option value="89">March 2018</option><option value="90">April 2018</option><option value="92">May 2018</option><option value="93">June 2018</option><option value="94">July 2018</option><option value="95">August 2018</option><option value="96">September 2018</option><option value="97">October 2018</option><option value="98">November 2018</option><option value="99">December 2018</option><option value="100">January 2019</option><option value="101">February 2019</option><option value="102">March 2019</option><option value="103">April 2019</option><option value="104">May 2019</option><option value="105">June 2019</option><option value="106">July 2019</option><option value="107">August 2019</option><option value="108">September 2019</option><option value="109">October 2019</option><option value="110">November 2019</option><option value="111">December 2019</option><option value="112">January 2020</option><option value="113">February 2020</option><option value="114">March 2020</option><option value="115">April 2020</option><option value="116">May 2020</option><option value="117">June 2020</option><option value="118">July 2020</option><option value="119">August 2020</option><option value="120">September 2020</option><option value="121">October 2020</option><option value="122">November 2020</option><option value="123">December 2020</option><option value="124">January 2021</option><option value="125">February 2021</option><option value="126">March 2021</option><option value="127">April 2021</option><option value="128">May 2021</option><option value="129">June 2021</option><option value="130">July 2021</option><option value="131">August 2021</option><option value="132">September 2021</option><option value="133">October 2021</option><option value="134">November 2021</option><option value="135">December 2021</option><option value="136">January 2022</option><option value="137">February 2022</option><option value="138">March 2022</option><option value="139">April 2022</option><option value="140">May 2022</option><option value="141">June 2022</option><option value="142">July 2022</option><option value="143">August 2022</option><option value="144">September 2022</option><option value="145">October 2022</option><option value="146">November 2022</option><option value="147">December 2022</option><option value="148">January 2023</option><option value="149">February 2023</option><option value="150">March 2023</option><option value="151">April 2023</option><option value="152">May 2023</option><option value="153">June 2023</option><option value="154">July 2023</option><option value="155">August 2023</option><option value="156">September 2023</option><option value="157">October 2023</option><option value="158">November 2023</option><option value="159">December 2023</option><option value="160">January 2024</option><option value="161">February 2024</option><option value="162">March 2024</option><option value="163">April 2024</option><option value="164">May 2024</option><option value="165">June 2024</option></select>
                                                </td>

                                            </tr>
                                            <tr valign="top">
                                                <td colspan="4" class="celldata">
                                                    <div style="margin-top:5px"><input type="radio" name="pop_type" value="residential" class="pop_op" checked="" data-has-listeners="true">Use <select name="census_year"><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option></select> residential population   &nbsp; <input type="radio" name="pop_type" value="daytime" class="pop_op" data-has-listeners="true">Use daytime population</div>
                                                </td>
                                            </tr>
                                            <tr valign="top"><td colspan="3">&nbsp;</td></tr>

                                            <tr>
                                                <td colspan="4" class="celldata">
                                                    <font class="heading">Include:</font>&nbsp;&nbsp;
                                                    <div class="selectall">
                                                        <a href="javascript:void($(&quot;[name='chkCrimeTypes[]']&quot;).prop('checked', true));">Select all</a> | <a href="javascript:void($(&quot;[name='chkCrimeTypes[]']&quot;).prop('checked', false));">Unselect all</a>
                                                    </div>
                                                    <table width="700px" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td><span id="chkCrimeTypes_1" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="1" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Anti-social behaviour</font></span></td>
                                                            <td><span id="chkCrimeTypes_2" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="2" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Burglary</font></span></td>
                                                            <td><span id="chkCrimeTypes_4" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="4" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Robbery</font></span></td>
                                                            <td><span id="chkCrimeTypes_5" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="5" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Vehicle crime</font></span></td>
                                                            <td><span id="chkCrimeTypes_6" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="6" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Violence and sexual offences</font></span></td>
                                                        </tr><tr><td><span id="chkCrimeTypes_8" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="8" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Public Disorder and Weapons</font></span></td>
                                                            <td><span id="chkCrimeTypes_9" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="9" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Shoplifting</font></span></td>
                                                            <td><span id="chkCrimeTypes_10" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="10" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Criminal Damage and Arson</font></span></td>
                                                            <td><span id="chkCrimeTypes_11" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="11" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Other Theft</font></span></td>
                                                            <td><span id="chkCrimeTypes_12" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="12" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Drugs</font></span></td>
                                                        </tr><tr><td><span id="chkCrimeTypes_3" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="3" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Other crime</font></span></td>
                                                            <td><span id="chkCrimeTypes_13" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="13" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Bicycle theft</font></span></td>
                                                            <td><span id="chkCrimeTypes_15" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="15" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Possession of weapons</font></span></td>
                                                            <td><span id="chkCrimeTypes_16" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="16" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Public order</font></span></td>
                                                            <td><span id="chkCrimeTypes_14" class="search_normal">
<input type="checkbox" style="vertical-align: middle;" name="chkCrimeTypes[]" value="14" checked="" data-has-listeners="true">&nbsp;<font style="font-size:11px; vertical-align:middle;">Theft from the person</font></span></td>
                                                        </tr></tbody></table>								</td>
                                            </tr>

                                            <tr valign="top"><td colspan="3">&nbsp;</td></tr>

                                            <tr>
                                                <td colspan="3" class="celldata">
                                                    <input type="submit" class="btnSubmit" name="btnCrimeDbSubmit" value="Get Report" data-has-listeners="true">&nbsp;
                                                    <input type="submit" name="btnCrimeDbReset" class="btnSubmit" value="Reset" data-has-listeners="true">&nbsp;&nbsp;
                                                    <input type="checkbox" name="chkExcel" value="1" data-has-listeners="true">&nbsp;<img src="http://localhost/img/excel.gif" border="0" width="16px">&nbsp;Export all results to Excel

                                                </td>
                                            </tr>
                                            </tbody></table>

                                    </td>
                                </tr>
                                </tbody></table>

                        </form>
                        <div class="clear"></div>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <table id="con_tbl" class="display">
        <thead>
            <tr>
                <th>
                    id
                </th>
                <th>Constituency</th>
                <th>Country</th>
                <th>Pop.</th>
                <th>Land Area (Hectares)</th>
                <th>ASB</th>
                <th>Burglary</th>
                <th>Robbery</th>
                <th>Vehicle</th>
                <th>Violent</th>
                <th>Shoplifting</th>
                <th>CDA</th>
                <th>Other Theft</th>
                <th>Drugs</th>
                <th>Bike Theft</th>
                <th>Theft From Person</th>
                <th>Weapons</th>
                <th>Order</th>
            </tr>
        </thead>
    </table>
<script>
    $(document).ready(function () {
        $('#con_tbl').DataTable({
            "processing": true,
            "serverSide": false,
            "ajax": '{{route("constit_get_data")}}',
            "columns" : [
                { data : 'constituencyid'},
                { data: null, render: function (data, type, row) {
                        return '<a href="https://www.ukcrimestats.com/Constituency/' + row.constituencyid + '">' + row.Constituency + '</a>';
                    }},
                { data: 'country' },
                { data: 'population', render: $.fn.dataTable.render.number(',', '.', 0)},
                { data: 'asb_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'rob_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'bur_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'veh_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'vio_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'all_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'pdw_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'shop_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'cda_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'othertheft_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'drug_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'ord_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'weap_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'bike_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'pers_total', render: $.fn.dataTable.render.number(',', '.', 0) },
                { data: 'other_total', render: $.fn.dataTable.render.number(',', '.', 0) },
            ]
        });
    });
</script>
@endsection
