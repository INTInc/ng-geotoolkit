import { Las20Stream } from '@int/geotoolkit/welllog/data/las/Las20Stream';
import { DataTable } from '@int/geotoolkit/data/DataTable';
import { NumericalDataSeries } from '@int/geotoolkit/data/NumericalDataSeries';
import { Range } from '@int/geotoolkit/util/Range';
import { URLUtil } from '@int/geotoolkit/util/URLUtil';
import { LineReader } from '@int/geotoolkit/util/stream/LineReader';
import { BrowserMemoryStream } from '@int/geotoolkit/util/stream/BrowserMemoryStream';
import { BrowserFileStream } from '@int/geotoolkit/util/stream/BrowserFileStream';
export class LasSource {
  static querySectionByName(sections, name) {
    for (let i = 0; i < sections.length; ++i) {
      if (sections[i].getName().toLowerCase().indexOf(name.toLowerCase()) >= 0) {
        return sections[i];
      }
    }
    return null;
  }

  static queryDataByKey(data, key) {
    for (let i = 0; i < data.length; ++i) {
      if (data[i].getMnemonic().toLowerCase() === key.toLowerCase()) {
        return data[i];
      }
    }
    return null;
  }

  static streamParse(lineReader, resolve, reject) {
    new Las20Stream({
      'reader': lineReader
    }).open(true).then(function (stream) {
      LasSource.loadTable(stream, resolve, reject);
    }, function (err) {
      reject(err);
    });
  }

  static loadTable(parser, resolve, reject) {
    const table = new DataTable(undefined);
    const wellSection = LasSource.querySectionByName(parser.getSections(), 'WELL');
    const minIndex = parseFloat(LasSource.queryDataByKey(wellSection.getData(), 'STRT').getValue());
    const maxIndex = parseFloat(LasSource.queryDataByKey(wellSection.getData(), 'STOP').getValue());
    const sections = parser.getSectionGroups();
    let curveSection = LasSource.querySectionByName(sections, 'LAS2');
    if (curveSection == null) {
      curveSection = LasSource.querySectionByName(sections, 'Main Section');
    }
    if (curveSection != null) {
      const curveNames = curveSection.getCurveMnemonics();
      for (let i = 0; i < curveNames.length; ++i) {
        const data = curveSection.getCurveData(i);
        const info = curveSection.getCurveInfo(i);
        const curve = new NumericalDataSeries({
          'name': info.getMnemonic(),
          'data': data,
          'id': info.getMnemonic(),
          'unit': info.getUnit()
        });
        table.addColumn(curve);
      }
      table.setMetaData({
        range: new Range(minIndex, maxIndex),
        index: table.getColumnByName('DEPTH') != null || curveNames.length === 0 ? 'DEPTH' : table.getColumn(0).getName()
      });
      resolve(table);
    } else {
      reject(table);
    }
  }

  /**
   * Loads template.
   * @param url url of the resource
   * @returns A promise to the loaded data source loaded data source.
   */
  public async loadFileFromURL(url: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 0 && xhr.response != null) { // 0 for work without server
            resolve(xhr.response);
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    });
  }

  public async openFromServer(path, fileName): Promise<DataTable> {
    const location = URLUtil.getHost() + path + '/';
    return new Promise(
      (resolve, reject) => {
        this.loadFileFromURL(location + encodeURIComponent(fileName)).then(function (data: string) {
            const lineReader = new LineReader({
              'stream': new BrowserMemoryStream({
                'buffer': BrowserMemoryStream.stringToArrayBuffer(data)
              })
            });
            Las20Stream.isLAS20(lineReader)
              .then(
                function (result) {
                  LasSource.streamParse(lineReader, resolve, reject);
                },
                function (result) {
                  reject();
                });
          },
          function () {
            reject();
          });
      });
  }

  /**
   * opens a file
   * @param file a file to open
   */
  public open(file: File) {
    const lineReader = new LineReader({
      'stream': new BrowserFileStream({
        'file': file
      })
    });
    const promise = new Promise(function (resolve, reject) {
      Las20Stream.isLAS20(lineReader)
        .then(
          function () {
            this.streamParse(lineReader, resolve, reject);
          },
          function (result) {
            reject();
          });
    });
    return promise;
  }
}
