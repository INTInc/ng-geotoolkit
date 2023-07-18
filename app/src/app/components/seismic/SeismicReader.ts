import { MemoryReader } from '@int/geotoolkit/seismic/data/MemoryReader';
import { SeismicReader as GeoSeismicReader } from '@int/geotoolkit/seismic/data/SeismicReader';
import { RemoteSeismicDataSource } from '@int/geotoolkit/seismic/data/RemoteSeismicDataSource';

export class SeismicReader {
  public static createMemoryReader(traceCount: number, sampleCount: number, sampleRate: number): MemoryReader {
    const reader = new MemoryReader({
      'numberoftraces': traceCount,
      'numberofsamples': sampleCount,
      'samplerate': sampleRate
    });

    reader.setTraceProcessor({
      'getAsyncData': (query, callback) => {
        callback({
            'getTraceData': (rdr, trace, traceId) => {
              for (let i = 0; i < rdr.getNumberOfSamples(); i++) {
                trace[i] = Math.cos(i / 8);
              }
            }
          }
        );
      },
      'getDataStatistics': () => {
        return {
          'average': 0,
          'min': -1,
          'max': 1,
          'rms': Math.sqrt(2) / 2
        };
      }
    });
    return reader;
  }

  public static createSectionQuery(position, key, oppositeKey) {
    const selectKeys = [];
    selectKeys[0] = {
      'name': key['key'],
      'min': position,
      'max': position,
      'step': key['increment'],
      'order': 'asc'
    };

    selectKeys[1] = {
      'name': oppositeKey['key'],
      'min': oppositeKey['min'],
      'max': oppositeKey['max'],
      'step': oppositeKey['increment'],
      'order': 'asc'
    };
    return {
      'keys': selectKeys,
      'options': null,
      'emptyTracesKey': {
        'name': oppositeKey['key'],
        'min': oppositeKey['min'],
        'max': oppositeKey['max']
      }
    };
  }

  public static createRemoteReader(): Promise<GeoSeismicReader> {

    return new Promise((accept, reject) => {
      const host = 'https://demo.int.com/INTGeoServer/json';
      const data = new RemoteSeismicDataSource({
        'host': host,
        'file': 'data/seismic/Gullfaks_Amplitude.xgy',
        'version': 2
      });
      data.open(
        () => {
          const keys = data.getKeys();
          const key = keys[0]; // INLINE
          const oppositeKey = keys[1]; // XLINE
          // Request the fist INLINE
          const query = this.createSectionQuery(key['min'], key, oppositeKey);
          data.select(query, (reader) => {
            accept(reader);
          });
        }, (err) => {
          reject(err);
        }
      );
    });
  }
}
