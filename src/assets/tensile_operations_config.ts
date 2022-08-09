// for tensile case
export enum ACTION {
    CleaningBegins = 0,
    CleaningEnds,
    Shifting,
    Averaging,
    Extrapolation,
  };


export const tensile_operations_config = [

    {
        action: 'Cleaning_ends',
        action_label: 'Cleaning Ends',
        methods: [
            { 
                label: 'None',
                type: 'None',
                params: []
            },
            {
                label: 'Max Stress',
                type: 'Y_Max',
                tip: 'Remove after maximum stress',
                params: []
            },
            {
                label: 'Max Strain',
                type: 'X_Max',
                tip: 'Remove after maximum strain',
                params: []
            },
            {
                label: 'User Defined Strain',
                type: 'Max_X',
                tip: 'Remove after a given stress',
                params: [{label: 'Value', name: 'value',  value: 0.05, float: true }]
            },
            {
                label: 'User Defined Stress',
                type: 'Max_Y',
                tip: 'Remove after a given strain',
                params: [{label: 'Value', name: 'value',  value: 1000, float: true}]
            },
            {
                label: 'User Defined Point',
                type: 'Max_Xs',
                tip: 'Remove after a selected point',
                params: [ {label: '', name: 'value', value: [], curveId: []}]
            }
        ],
        selected_method: 'None',
        status: 'waiting',
        error: ''
    },
    {
        action: 'Shifting',
        action_label: 'Shifting',
        methods: [
            { 
                label: 'None',
                type: 'None',
                params: []
            },
            // {
            //     label: 'User Defined Strain',
            //     type: 'X_shift_defined',
            //     tip: 'Shift all curves by a given value',
            //     params: [{label: 'Value', name: 'value',  value: 0, float: true}]
            // },
            {
                label: 'Linear Regression Stress',
                type: 'X_tangent_yrange',
                tip: 'Shift each curve to ensure curve passing by the origin using points in a defined stress range',
                params: [{label: 'Initial Stress', name: 'min', value: 0, float: true},
                         {label: 'Final Stress', name: 'max', value: undefined, float: true}]
            },
            {
                label: 'Linear Regression Strain',
                type: 'X_tangent_xrange',
                tip: 'Shift each curve to ensure curve passing by the origin using points in a defined strain range',
                params: [{label: 'Initial Strain', name: 'min', value: 0, float: true},
                         {label: 'Final Strain',  name: 'max',value: 0.001, float: true}]
            }
        ],
        selected_method: 'None',
        status: 'waiting',
        error: ''
    },
    {
        action: 'Averaging',
        action_label: 'Averaging',
        methods: [
            { 
                label: 'None',
                type: 'None',
                params: []
            },
            {
                label: 'Spline',
                type: 'Spline',
                tip: 'Interpolate curves using cubic splines',
                params: [{label:'Number of Points', name: 'number_of_points',  value: 100, tip: 'Number of averaging curve points'},
                         {label:'Number of Splines', name: 'number_of_nodes', value: 10, range: {min: 5, max: 100}, tip: 'Number of cubic splines'},
                         {label:'Smoothing', name: 'regularization', value: 5, range: {min: 1, max: 9}, tip: 'Smoothing effect'},
                         {
                            label: 'Averaging Limit',
                            name: 'Averaging_Limit',
                            tip:'',
                            selection:[{label:'Average Max Strain', name:'mean_max_x', tip: 'Use the average of all  end strain values'},
                           {label:'Lowest Max Strain', name:'max_max_x', tip: 'Use the largest strain of all end strain values'},
                           {label:'Average 1S Max Strain',name:'min_max_x', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.' },
                           {label:'User Defined Strain',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.',
                           params:[{
                           label: 'Strain Limit',
                           name: 'min_max_x',
                           // tip: 'Remove after a given strain',
                           // params: [{label: 'Value', name: 'value',  value: 1000, float: true}]
                           value:100,
                           float:true
                       }],},

                           ],value:0}
                                           
                        
                        ]
            },
            {
                label: 'Polynomial',
                type: 'Polynomial',
                tip: 'Interpolate curves using a polynomial function',
                params: [{label:'Number of points', name: 'number_of_points', value: 100, tip: 'Number of averaging curve points' },
                         {label:'Order', name: 'order', value: 6, tip: 'Polynomial order of the interpolated curve'},
                         {
                            label: 'Averaging Limit',
                            name: 'Averaging_Limit',
                            tip:'',
                            selection:[{label:'Average Max Strain', name:'mean_max_x', tip: 'Use the average of all  end strain values'},
                           {label:'Lowest Max Strain', name:'max_max_x', tip: 'Use the largest strain of all end strain values'},
                           {label:'Average 1S Max Strain',name:'min_max_x', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.' },
                           {label:'User Defined Strain',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.',
                           params:[{
                           label: 'Strain Limit',
                           name: 'min_max_x',
                           // tip: 'Remove after a given strain',
                           // params: [{label: 'Value', name: 'value',  value: 1000, float: true}]
                           value:100,
                           float:true
                       }],},

                           ],value:0}
                        ]
            }
            ],
                selected_method: 'None',
                status: 'waiting',
                error: ''
    },
    {
        action: 'Extrapolation',
        action_label: 'Extrapolation',
        methods: [
            { 
                label: 'None',
                type: 'None',
                params: []
            },
            {
                label: 'Curve Pattern shift(default)',
                type: 'Curve Pattern shift(default)',
                tip: 'Remove after maximum stress',
                params: [{label: 'curve', name: 'curve', tip: '',
                selection:[{label:'Highest max Strain(default)', name:'mean_max_x', tip: 'Use the average of all  end strain values'}
                           ],value:0},{label: 'Extrapolation limit', name: 'extrapolation_limit', tip: '',
                selection:[{label:'Average max Strain(default)', name:'mean_max_x', tip: 'Use the average of all  end strain values'},
                           {label:'Highest Max Strain', name:'max_max_x', tip: 'Use the largest strain of all end strain values'},
                           {label:'Average Strength',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'},
                           {label:'User Defined Strain',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'},
                           {label:'User Defined Stress',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'}

                           ],value:1}]
            },
            {
                label: 'Tangent at averaging Limit',
                type: 'Tangent at averaging Limit',
                tip: 'Remove after maximum strain',
                params: [{label: 'curve', name: 'curve', tip: '',
                selection:[{label:'Highest max Strain(default)', name:'mean_max_x', tip: 'Use the average of all  end strain values'}
                           ],value:0},{label: 'Extrapolation limit', name: 'extrapolation_limit', tip: '',
                selection:[{label:'Average max Strain(default)', name:'mean_max_x', tip: 'Use the average of all  end strain values'},
                           {label:'Highest Max Strain', name:'max_max_x', tip: 'Use the largest strain of all end strain values'},
                           {label:'Average Strength',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'},
                           {label:'User Defined Strain',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'},
                           {label:'User Defined Stress',name:'x_value', tip: 'Define the largest strain value.\nWARNING: Can be larger than max strain. No check performed.'}

                           ],value:1}]
            }
        ],
        selected_method: 'None',
        status: 'waiting',
        error: ''
    },

    
]