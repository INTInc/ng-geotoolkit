export const filltemplate = {
    'template': {
        'type': 'welllog',
        'tracks': [
            {
                'cg_id': 2,
                'name': 'Track # 0',
                'type': 'index',
                'width': 50,
                'axis': {
                    'cg_type': 'axis',
                    'id': 'AXIS',
                    'visible': 'true',
                    'name': '',
                    'major_ticks': {
                        'cg_type': 'linestyle',
                        'cg_id': 4,
                        'color': '#6b6b6b',
                        'width': 1,
                        'pattern': null,
                        'pixelSnapMode': {
                            'cg_id': 5,
                            'x': true,
                            'y': true
                        },
                        'lineJoin': 'round',
                        'lineCap': 'butt'
                    },
                    'minor_ticks': {
                        'cg_type': 'linestyle',
                        'cg_id': 6,
                        'color': '#6b6b6b',
                        'width': 1,
                        'pattern': null,
                        'pixelSnapMode': {
                            'cg_id': 7,
                            'x': true,
                            'y': true
                        },
                        'lineJoin': 'round',
                        'lineCap': 'butt'
                    },
                    'major_labels': {
                        'cg_type': 'textstyle',
                        'cg_id': 8,
                        'color': '#6b6b6b',
                        'font': '12px sans-serif',
                        'baseLine': 'middle',
                        'alignment': 'center',
                        'lineHeight': '100%',
                        'multiLine': true,
                        'autoSize': true
                    }
                },
                'visuals': []
            },
            {
                'cg_id': 10,
                'name': 'Track # 1',
                'type': 'log',
                'width': 200,
                'grids': {
                    'index': [
                        {
                            'cg_type': 'horizontalgrid',
                            'cg_id': 11,
                            'selectable': true,
                            'name': 'IndexGrid1',
                            'visible': true,
                            'id': null,
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 12,
                                'color': '#aaa',
                                'width': 1,
                                'pattern': null,
                                'pixelSnapMode': {
                                    'cg_id': 13,
                                    'x': false,
                                    'y': false
                                },
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'minorLineStyle': '#href(12)',
                            'majorLineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 14,
                                'color': '#40444C',
                                'width': 2,
                                'pattern': null,
                                'pixelSnapMode': {
                                    'cg_id': 15,
                                    'x': false,
                                    'y': false
                                },
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'tickGenerator': {
                                'cg_type': 'adaptivetickgenerator',
                                'cg_id': 16,
                                'tickStyles': {
                                    'cg_id': 17,
                                    'MAJOR': {
                                        'cg_type': 'linestyle',
                                        'cg_id': 18,
                                        'color': 'lightgray',
                                        'width': 2,
                                        'pattern': null,
                                        'pixelSnapMode': {
                                            'cg_id': 19,
                                            'x': false,
                                            'y': true
                                        },
                                        'lineJoin': 'round',
                                        'lineCap': 'butt'
                                    },
                                    'MINOR': {
                                        'cg_type': 'linestyle',
                                        'cg_id': 20,
                                        'color': 'lightgray',
                                        'width': 1,
                                        'pattern': null,
                                        'pixelSnapMode': {
                                            'cg_id': 21,
                                            'x': false,
                                            'y': true
                                        },
                                        'lineJoin': 'round',
                                        'lineCap': 'butt'
                                    },
                                    'EDGE': {
                                        'cg_type': 'linestyle',
                                        'cg_id': 22,
                                        'color': '#000',
                                        'width': 1,
                                        'pattern': null,
                                        'pixelSnapMode': {
                                            'cg_id': 23,
                                            'x': true,
                                            'y': true
                                        },
                                        'lineJoin': 'round',
                                        'lineCap': 'butt'
                                    }
                                },
                                'labelStyles': {
                                    'cg_id': 24,
                                    'EDGE': {
                                        'cg_type': 'textstyle',
                                        'cg_id': 25,
                                        'color': '#000',
                                        'font': '12px sans-serif',
                                        'baseLine': 'middle',
                                        'alignment': 'center',
                                        'lineHeight': '100%',
                                        'multiLine': true,
                                        'autoSize': true
                                    },
                                    'MAJOR': {
                                        'cg_type': 'textstyle',
                                        'cg_id': 26,
                                        'color': '#000',
                                        'font': '12px sans-serif',
                                        'baseLine': 'middle',
                                        'alignment': 'center',
                                        'lineHeight': '100%',
                                        'multiLine': true,
                                        'autoSize': true
                                    }
                                },
                                'labelAngles': {
                                    'cg_id': 27
                                },
                                'visibleTicks': {
                                    'cg_id': 28
                                },
                                'visibleLabels': {
                                    'cg_id': 29,
                                    'EDGE': false,
                                    'MAJOR': false,
                                    'MINOR': false
                                },
                                'tag': null,
                                'logScale': false,
                                'minSpan': 10,
                                'precision': 5,
                                'formatLabelEventHandler': null,
                                'minorTicksAmount': 5,
                                'modelMultiplier': 2
                            }
                        }
                    ],
                    'value': [
                        {
                            'cg_type': 'linearvaluegrid',
                            'cg_id': 30,
                            'selectable': true,
                            'name': '',
                            'visible': true,
                            'id': 'LinearGrid1',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 31,
                                'color': 'lightgray',
                                'width': 1,
                                'pattern': null,
                                'pixelSnapMode': {
                                    'cg_id': 32,
                                    'x': true,
                                    'y': false
                                },
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'linesCount': 11
                        },
                        {
                            'cg_type': 'linearvaluegrid',
                            'cg_id': 33,
                            'selectable': true,
                            'name': '',
                            'visible': true,
                            'id': 'LinearGrid2',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 34,
                                'color': 'lightgray',
                                'width': 2,
                                'pattern': null,
                                'pixelSnapMode': '#href(32)',
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'linesCount': 3
                        },
                        {
                            'cg_type': 'log10valuegrid',
                            'cg_id': 35,
                            'selectable': true,
                            'name': '',
                            'visible': true,
                            'id': 'LogGrid1',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 36,
                                'color': 'lightgray',
                                'width': 1,
                                'pattern': null,
                                'pixelSnapMode': '#href(32)',
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'decadeCount': 2,
                            'offset': 0,
                            'step': 0.5,
                            'bounds': null,
                            'intermediate': true
                        },
                        {
                            'cg_type': 'log10valuegrid',
                            'cg_id': 37,
                            'selectable': true,
                            'name': '',
                            'visible': true,
                            'id': 'LogGrid2',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 38,
                                'color': 'lightgray',
                                'width': 1,
                                'pattern': null,
                                'pixelSnapMode': '#href(32)',
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'decadeCount': 2,
                            'offset': 0,
                            'step': 0.5,
                            'bounds': null,
                            'intermediate': false
                        }
                    ]
                },
                'visuals': [
                    {
                        'cg_type': 'compositecurve',
                        'id': null,
                        'name': 'GR',
                        'display_mode': [
                            'line'
                        ],
                        'logarithmic_scale': 'false',
                        'interpolation': 'Linear',
                        'wrapping': 'false',
                        'limits_type': '2',
                        'custom_limits_minimum': '7',
                        'custom_limits_maximum': '12',
                        'linestyle': {
                            'cg_type': 'linestyle',
                            'cg_id': 44,
                            'color': 'green',
                            'width': 1,
                            'pattern': null,
                            'pixelSnapMode': {
                                'cg_id': 45,
                                'x': false,
                                'y': false
                            },
                            'lineJoin': 'round',
                            'lineCap': 'butt'
                        },
                        'textstyle': {
                            'cg_type': 'textstyle',
                            'cg_id': 46,
                            'color': 'black',
                            'font': '12px sans-serif',
                            'baseLine': 'alphabetic',
                            'alignment': 'left',
                            'lineHeight': '100%',
                            'multiLine': true,
                            'autoSize': true
                        },
                        'left_filltype': 'POSITIVE',
                        'right_filltype': 'NEGATIVE',
                        'left_reference': '#href(47)',
                        'left_fill': {
                            'cg_type': 'logfill',
                            'cg_id': 48,
                            'selectable': true,
                            'name': '',
                            'visible': true,
                            'id': null,
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'cg_id': 49,
                                'color': '#aaa',
                                'width': 1,
                                'pattern': null,
                                'pixelSnapMode': {
                                    'cg_id': 50,
                                    'x': false,
                                    'y': false
                                },
                                'lineJoin': 'round',
                                'lineCap': 'butt'
                            },
                            'curve1': '#href(47)',
                            'curve2': '#href(43)',
                            'fillStyle': {
                                'cg_type': 'loggradient',
                                'cg_id': 51,
                                'color': 'yellow',
                                'pattern': {
                                    'cg_type': 'imagepattern',
                                    'cg_id': 52,
                                    'patternName': 'sand',
                                    'containerName': 'testpatterns'
                                },
                                'foreground': 'blue',
                                'renderbackground': true,
                                'transparency': 150,
                                'colorprovider': 'darkbody',
                                'datasource': 'GR'
                            },
                            'negativeFillStyle': {
                                'cg_type': 'fillstyle',
                                'cg_id': 53,
                                'color': 'yellow',
                                'pattern': null
                            },
                            'positiveFillStyle': '#href(53)',
                            'fillType': 'single'
                        },
                        'cg_id': 43
                    },
                    {
                        'cg_type': 'referenceline',
                        'cg_id': 47,
                        'selectable': true,
                        'name': '',
                        'visible': true,
                        'id': null,
                        'lineStyle': {
                            'cg_type': 'linestyle',
                            'cg_id': 54,
                            'color': '#aaa',
                            'width': 1,
                            'pattern': null,
                            'pixelSnapMode': {
                                'cg_id': 55,
                                'x': false,
                                'y': false
                            },
                            'lineJoin': 'round',
                            'lineCap': 'butt'
                        },
                        'value': 0,
                        'level': null
                    }
                ]
            }
        ]
    }
};
