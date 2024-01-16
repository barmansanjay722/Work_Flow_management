import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WorklistChart(props) {
  const series1Ref = useRef(null);
  const series2Ref = useRef(null);
  const xAxisRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(props.id);
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        innerRadius: am5.percent(50),
        startAngle: -90,
        endAngle: 180,
      })
    );
    var cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);
    var xRenderer = am5radar.AxisRendererCircular.new(root, {
    });
    let templateOptions = {
      radius:10
    };
    if(localStorage.getItem('data-bs-theme-mode') === 'dark'){
      templateOptions.fill = am5.color(0xffffff)
    }
    xRenderer.labels.template.setAll(templateOptions);
    xRenderer.grid.template.setAll({
      forceHidden: true,
    });
    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
      })
    );
    xAxis.get("renderer").labels.template.setAll({
      fontWeight: "500",
      fontSize: 9,
    });
    var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 5,
    });
    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 13,
      templateField: "columnSettings",
    });
    yRenderer.grid.template.setAll({
      forceHidden: true,
    });
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      })
    );
    yAxis.data.setAll(props.data);
    var series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "category",
        fill: root.interfaceColors.get("alternativeBackground"),
      })
    );
    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20,
    });
    series1.data.setAll(props.data);
    root._logo.dispose();
    var series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "category",
      })
    );
    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}% ({absoluteValue})",
      cornerRadius: 20,
      templateField: "columnSettings",
    });
    series2.data.setAll(props.data);
    xAxisRef.current = xAxis;
    series1Ref.current = series1;
    series2Ref.current = series2;
    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <div id={props.id} style={{ width: "100%", height: "350px" }}></div>;
}
