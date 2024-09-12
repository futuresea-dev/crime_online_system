@php
    if (!$startmonth) {
        $startmonth = $default_year = _LATEST_YEARID_;
    }
@endphp

<a class="btn btn-primary btn-xs" role="button" data-toggle="collapse" href="#crimeform" aria-expanded="true" aria-controls="crimeform">
    Hide Search
</a>

<div id="crimeform" class="row collapse in search-panel" aria-expanded="true">
    <form action="{{ _MY_HREF_.$type_location }}/" method="POST" name="theform">
        <table width="100%" cellspacing="5" cellpadding="2" border="0">
            @if (empty($_SESSION['s_userid']))
                <input type='hidden' name='startmonth' value='{{ _LATEST_YEARID_ }}' />
                @php $disabled = 'disabled title="To enable this feature, become a member. Login required from &pound;4.99 a month." ' @endphp
            @endif

            <tr valign="top">
                <td>
                    <font class="heading">Show me:</font>
                    <table width="100%" cellspacing="0" cellpadding="2" border="0">
                        @if ($type_location === 'Subdivisions')
                            <tr valign="top">
                                <td class="celldata" colspan="2" style="padding-bottom:5px">
                                    Subdivision:
                                    <select name="sub" id="sub" style="font-size:9pt;" onchange="toggleSubdivPop(this)">
                                        {{ displaySubdivisions($sub) }}
                                    </select>
                                </td>
                            </tr>
                        @endif

                        <tr valign="top">
                            <td class="celldata" width="300px">
                                <select name="bw" {{ $disabled }}>
                                    <option value="Highest" id="bw_first" {{ $bw_worst_selected }}>Highest</option>
                                    <option value="Lowest" {{ $bw_best_selected }}>Lowest</option>
                                </select>
                                <select name="qt" {{ $disabled }}>
                                    <option value="Total">Total Crime</option>
                                    <option value="Rate" {{ $reportType == "Rate" || $showrate ? "selected" : "" }}>Crime Rate</option>
                                    @if ($no_ha)
                                        @php $hideha = "style='display:none'" @endphp
                                    @endif
                                    <option class="ha" value="Density" {{ $hideha }} {{ $reportType == "Density" ? "selected" : "" }}>Crime per Hectare</option>
                                    <option class="ha" value="DensityRate" {{ $hideha }} {{ $reportType == "DensityRate" ? "selected" : "" }}>Crime rate per Hectare</option>
                                </select>
                            </td>
                            <td class="celldata" width="350px">
                                <font class="heading">Between:</font>&nbsp;
                                <select name="startmonth" style="font-size:9pt;" {{ $disabled }}>
                                    {{ displayCrimeYears_Start($startmonth) }}
                                </select>
                                &nbsp;and&nbsp;
                                <select name="endmonth" style="font-size:9pt;" {{ $disabled }}>
                                    {{ displayCrimeYears_End($endmonth) }}
                                </select>
                            </td>
                        </tr>

                        <tr valign="top">
                            <td colspan="4" class="celldata">
                                @if ($type_location == "LSOA" || $type_location == "MSOA" || $type_location == "Constituencies")
                                    @php
                                        $yearops = array();
                                        if (!count($pop_years))
                                            $pop_years = array(2017,2016,2015,2014,2013,2012,2011);
                                        foreach ($pop_years as $census_year) {
                                            $yearops[] = "<option value='$census_year'" . ($_POST['census_year'] == $census_year ? "selected" : "") . ">$census_year</option>";
                                            ++$zebra;
                                        }
                                    @endphp
                                    <div style="margin-top:5px">
                                        <input type="radio" name="pop_type" value="residential" class="pop_op" {{ $respop_checked }} {{ $disabled }}>
                                        Use
                                        <select name="census_year" {{ $disabled }}>
                                            @foreach ($yearops as $yo)
                                                {{ $yo }}
                                            @endforeach
                                        </select>
                                        residential population
                                        &nbsp;
                                        <input type="radio" name="pop_type" value="daytime" class="pop_op" {{ $daypop_checked }} {{ $disabled }}>
                                        Use daytime population
                                    </div>
                                @elseif ($has_daypop)
                                    <div style="margin-top:5px" class="daypop_op">
                                        <input type="checkbox" name="use_daypop" class="pop_op" {{ $daypop_checked }} {{ $disabled }}>
                                        Use daytime population
                                    </div>
                                @endif
                            </td>
                        </tr>

                        <tr valign="top">
                            <td colspan="3">&nbsp;</td>
                        </tr>

                        <tr>
                            <td colspan="4" class="celldata">
                                <font class="heading">Include:</font>&nbsp;&nbsp;
                                <div class="selectall">
                                    <a href="javascript:void($('[name=\'chkCrimeTypes[]\']').prop('checked', true));">Select all</a> | <a href="javascript:void($('[name=\'chkCrimeTypes[]\']').prop('checked', false));">Unselect all</a>
                                </div>
                                {{ displayCheckboxFields_Horizontal(getCrimeTypes($crimetypes, true, false, true), "chkCrimeTypes", "search_normal", 6, $disabled) }}
                            </td>
                        </tr>

                        <tr valign="top">
                            <td colspan="3">&nbsp;</td>
                        </tr>

                        <tr>
                            <td colspan="3" class="celldata">
                                <input type="submit" class="btnSubmit" name="btnCrimeDbSubmit" value="Get Report">
                                &nbsp;
                                <input type="submit" name="btnCrimeDbReset" class="btnSubmit" value="Reset">
                                &nbsp;&nbsp;
                                <input type="checkbox" name="chkExcel" value="1" {{ $disabled }}>
                                &nbsp;
                                <img src="{{ _MY_IMG_H_.'excel.gif' }}" border="0" width="16px">
                                &nbsp;Export all results to Excel
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </form>

    <div class="clear"></div>
    <br/><br/>
</div>
