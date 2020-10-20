// Simple template
export const template0 = {'template': {
    'type': 'welllog',
    'tracks':
    [
        {'name': 'Track # 0', 'type': 'index'},
        {'name': 'Track # 1', 'type': 'linear',
            'visuals': [{'cg_type': 'curve', 'name': 'CALI'}]
        }
    ]
}};
// Template has two track and one index track with one curve each
export const template1 = {'template': {
    'type': 'welllog',
    'tracks':
        [
            {'name': 'Track # 0', 'type': 'index'},
            {'name': 'Track # 1', 'type': 'linear',
                'visuals': [
                    {
                        'cg_type': 'curve',
                        'name': 'CALI',
                        'linestyle': {
                            'color': 'red', 'width': 1
                        }
                    }
                ]
            },
            {'name': 'Track # 3', 'type': 'linear',
                'visuals': [
                    {
                        'cg_type': 'curve',
                        'name': 'GR',
                        'linestyle': {
                            'color': 'blue', 'width': 1
                        }
                    }
                ],
                'grids': {
                    'index': [
                        {
                            'cg_type': 'horizontalgrid',
                            'cg_id': 11,
                            'visible': true,
                            'name': 'IndexGrid1',
                            'tickGenerator': {
                                'cg_type': 'adaptivetickgenerator',
                                'tickStyles': {
                                    'MAJOR': {
                                        'cg_type': 'linestyle',
                                        'color': 'lightgray',
                                        'width': 1
                                    },
                                    'MINOR': {
                                        'cg_type': 'linestyle',
                                        'color': 'lightgray',
                                        'width': 1
                                    }
                                }
                            }
                        }
                    ],
                    'value': [
                        {
                            'cg_type': 'linearvaluegrid',
                            'id': 'LinearGrid1',
                            'visible': true,
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'color': 'lightgray',
                                'width': 1
                            },
                            'linesCount': 11
                        },
                        {
                            'cg_type': 'linearvaluegrid',
                            'id': 'LinearGrid2',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'color': 'lightgray',
                                'width': 2
                            },
                            'linesCount': 1
                        }
                    ]
                }
            },
            {'name': 'Track # 4',
                'type': 'custom',
                'width': 200,
                'visuals': [
                    {
                        'cg_type': 'curve',
                        'name': 'SP',
                        'linestyle': {
                            'color': 'blue', 'width': 1
                        }
                    }
                ],
                'grids': {
                    'index': [
                        {
                            'cg_type': 'horizontalgrid',
                            'cg_id': 11,
                            'visible': true,
                            'name': 'IndexGrid1',
                            'tickGenerator': {
                                'cg_type': 'adaptivetickgenerator',
                                'tickStyles': {
                                    'MAJOR': {
                                        'cg_type': 'linestyle',
                                        'color': 'lightgray',
                                        'width': 1
                                    },
                                    'MINOR': {
                                        'cg_type': 'linestyle',
                                        'color': 'lightgray',
                                        'width': 1
                                    }
                                }
                            }
                        }
                    ],
                    'value': [
                        {
                            'cg_type': 'linearvaluegrid',
                            'id': 'LinearGrid1',
                            'visible': true,
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'color': 'lightgray',
                                'width': 1
                            },
                            'linesCount': 11
                        },
                        {
                            'cg_type': 'linearvaluegrid',
                            'id': 'LinearGrid2',
                            'lineStyle': {
                                'cg_type': 'linestyle',
                                'color': 'lightgray',
                                'width': 2
                            },
                            'linesCount': 1
                        }
                    ]
                }
            },
            {
                'name': 'Track # 5', 'type': 'index',
                'axis': {
                    'cg_type': 'axis',
                    'id': 'AXIS',
                    'name': 'MD',
                    'major_ticks': {
                        'cg_type': 'linestyle',
                        'color': 'gray',
                        'width': 1
                    },
                    'major_labels': {
                        'cg_type': 'textstyle',
                        'color': '#6b6b6b',
                        'font': '12px times-new-roman'
                    }
                }
            }
        ]
}};
