import {DataBinding} from '@int/geotoolkit/data/DataBinding';
import {Node} from '@int/geotoolkit/scene/Node';
import {LogCurve} from '@int/geotoolkit/welllog/LogCurve';
import {DataTable} from '@int/geotoolkit/data/DataTable';
import {NumericalDataSeries} from '@int/geotoolkit/data/NumericalDataSeries';
import {LogData} from '@int/geotoolkit/welllog/data/LogData';

/**
 * A simple data binding class
 */
export class CurveDataBinding extends DataBinding {
  /**
   * Checks if the given node can be accepted for the data binding. Only geotoolkit.welllog.LogCurve nodes are accepted
   * @param node a node to check if it's a LogCurve
   */
  public accept(node: Node) {
    return node instanceof LogCurve;
  }

  /**
   * Binds the given data to the curve
   * @param curve a curve to bind data to
   * @param data a data to bing to a curve
   */
  public bind(curve: LogCurve, data: DataTable) {
    if (data == null) {
      return;
    }
    const curveName = curve.getName();
    const curveData = data.getColumnByName(curveName);

    if (curveData instanceof NumericalDataSeries) {
      const meta = data.getMetaData();
      const logData = new LogData({
        'name': curveName,
        'depths': data.getColumnByName(meta['index']).toArray(),
        'values': curveData.toArray()
      });
      curve.setData(logData, true, true);
      curve.setNormalizationLimits(curveData.getMin(), curveData.getMax());
    }
  }

  /**
   * Unbind data
   * @param curve instance to apply the databinding to
   * @param data data to bind to the node
   */
  public unbind(curve: LogCurve, data: DataTable): void {

  }
}
