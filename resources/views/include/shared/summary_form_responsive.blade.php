
<div id="crimeform" class="row collapse in search-panel" aria-expanded="true">
    <form action="{{ _MY_HREF_.$type_location }}/" method="POST" name="theform">
        @if (empty($_SESSION['s_userid']))
            <input type='hidden' name='startmonth' value='{{ _LATEST_YEARID_ }}' />
            @php $disabled = 'disabled' @endphp
        @endif

        <div class="form-input col-lg-12">
            <h4>Show me:</h4>
        </div>

        @if ($type_location == 'Subdivisions')
            <div class="form-input col-lg-4">
                <label for="sub">Subdivision:</label>
                <select name="sub" id="sub" class="form-control" style="font-size:9pt;" onchange="toggleSubdivPop(this)">
                    {{ displaySubdivisions($sub) }}
                </select>
            </div>
            <div class="clear"></div>
            <br>
        @endif

        @if (1)
            <!-- Add your code here -->
        @endif

        <div class="form-inline col-lg-6 col-md-6">
            <select name="sortorder" style="font-size:9pt;" class="form-control input-sm" {{ $disabled }}>
                <option value="DESC" id="bw_first">Highest</option>
                <option value="ASC" {{ $sort_order === "ASC" ? "selected" : "" }}>Lowest</option>
            </select>

            <select name="qt" style="font-size:9pt;" class="form-control input-sm" {{ $disabled }}>
                <option value="Total">Total Crime</option>
                <option value="Rate" {{ $report_type === "Rate" || $showrate ? "selected" : "" }}>Crime Rate</option>
                <!-- Add your code here -->
            </select>

            @if($store)
                <option value="Percentile" @if($report_type === "Percentile") selected @endif>Percentile</option>
                </select>
                <label for='radius'> in a </label>
                <select name="radius" class="form-control input-sm">
                    <option value="">1 Mile Radius</option>
                    <option value="1hm" @if($radius === '1hm') selected @endif>1/2 Mile Radius</option>
                    <option value="1qm" @if($radius === '1qm') selected @endif>1/4 Mile Radius</option>
                </select>
            @else
                @if(!$no_ha)
                    <option class="ha" value="Density" @if($report_type === "Density") selected @endif>Crime per Hectare</option>
                    <option class="ha" value="DensityRate" @if($report_type === "DensityRate") selected @endif>Crime rate per Hectare</option>
                @endif
            @endif

{{--            @if ($type_location === "LSOA" || $type_location === "MSOA" || $type_location === "Constituencies")--}}

{{--            @endif--}}

{{--            @if ($has_daypop)--}}
{{--                <label class="radio-inline pop_op">--}}
{{--                    <input type='checkbox' name='use_daypop' class='pop_op' {{ $daypop_checked }} {{ $disabled }}> Use daytime population for crime rate--}}
{{--                </label>--}}
{{--            @endif--}}

            <br><br>
        </div>

        <div class="form-inline col-lg-6 col-md-6">
            <label for="startmonth">Between:</label>
            <select name="startmonth" class="form-control input-sm" style="font-size:9pt;" {{ $disabled }}>
                {{ displayCrimeYears_Start($startmonth) }}
            </select>

            <label for="startmonth">and</label>
            <select name="endmonth" class="form-control input-sm" style="font-size:9pt;" {{ $disabled }}>
                {{ displayCrimeYears_End($endmonth) }}
            </select>

            <br><br>
        </div>

        <div class="form-input col-lg-12">
            <label for="startmonth">Include:</label>
            <div class="selectall">
                <a href="javascript:void($('[name=\'chkCrimeTypes[]\']').prop('checked', true));">Select all</a> | <a href="javascript:void($('[name=\'chkCrimeTypes[]\']').prop('checked', false));">Unselect all</a>
            </div>

            {{ displayCheckboxFields_Horizontal_Responsive(getCrimeTypes($crimetypes, true, false, true), "chkCrimeTypes", "search_normal", 6, $disabled) }}

            <div class="clear"></div>
            <br>
        </div>

        <div class="form-input col-lg-12">
            <input type="submit" class="btnSubmit btn btn-sm btn-primary" name="btnCrimeDbSubmit" value="Get Report">
            &nbsp;
            <input type="submit" name="btnCrimeDbReset" class="btnSubmit btn btn-sm" value="Reset">
            &nbsp;&nbsp;
            <input type="checkbox" name="chkExcel" value="1" {{ $disabled }}>
            &nbsp;
            <img src="{{ _MY_IMG_H_.'excel.gif' }}" border="0" width="16px">
            &nbsp;Export all results to Excel
        </div>
    </form>

    <div class="clear"></div>
    <br><br>
</div>
