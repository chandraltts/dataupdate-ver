import React , {useState, useEffect} from 'react'
import { Parameter as parameter_type } from '../../../containers/PlotBuilder/Model/template.model';
import '../../../App.css';
import '../Steps.css';
import {Select, Button, Space,  Row, Col, InputNumber, Tooltip, Collapse} from 'antd';
// npm install --save rfdc @types/rfdc
const clone = require('rfdc')();

const { Panel } = Collapse;

interface DisplayParameterProps {
    initParams: parameter_type[];
    onChangeParameter: (a: any, apply: boolean) => any;
    actionLabel: string;
    saveParams: (p: parameter_type[] ) => void;
    action: string;
    method: string;
    removeAllPoints: () => void;
    // finalArr:string[]
};

const DisplayParametersFroms: React.FC<DisplayParameterProps> = ({initParams, onChangeParameter,actionLabel,saveParams,action,method,removeAllPoints}) => {
    const [params,setParams] = useState<parameter_type[]>([]);
    const { Option } = Select;
    const [linked,setLinked] = useState([]);
    const[strain,setStrain]=useState(false);
    const[header,setHeader]
=useState('Show More Options');
    useEffect( () => {
        //const param_init = [...initParams];  // it is a shallow copy
        //const param_init = JSON.parse(JSON.stringify(initParams)); // it is a deep copy
        //console.log("Action: "+action+" Method: "+method);
        const param_init = clone(initParams); // efficient deep copy
        setParams(param_init);
        const linked_init = [];
        param_init.forEach(p => {
            if('selection' in p){
                const l = p.selection[p.value].link;
                if(l){
                    linked_init.push( {parameter: p.name, value: [...l]});
                } else {
                    linked_init.push( {parameter: p.name, value: []});
                }
            }
        });
        setLinked(linked_init);
    },[initParams]);

    const changeParamHandler = (event: any,name: string) => {
        const new_params = [...params];
        const par = new_params.find( e => e.name===name);
        if(par)
            par.value=event;
        setParams(new_params);
        saveParams(new_params);
    }
  const selectParamHandlerTwo=(name: string, param: any)=>{
    

  }

    const selectParamHandler = (value:any, name: string, param: any) => {
        const value_num = param.selection.findIndex( e => e.name===value);
        const new_params = [...params];
        const par = new_params.find( e => e.name===name);
        if(par)
            par.value=value_num;
        setParams(new_params);
        saveParams(new_params);

        const linked_curr = linked;
        const t = linked_curr.find( e => e.parameter===name);
        const link = par.selection[value_num].link;
        if(t){
            if(link)
             // t.value.push(link);
              t.value = [...t.value, ...link];
            else
              t.value=[]; 
            setLinked(linked_curr);
        }
       
    }
    const fontStyle = {
        fontSize: '12px',
    };

    const displayParameter = (p: parameter_type) => {
        console.log("p...",p);
        if( p.label.length==0){
            return;
        }
        else if( 'selection' in p ){  
            
if(!(p.label==="Averaging Limit")){

    return (
        <Row key={p.label}>
        <Col span={10}>
        <Tooltip title={p.tip}>{p.label}</Tooltip>
        </Col>
        <Col span={10}>
            <Select placeholder="Default value"
                 value={p.selection[p.value].name}
                 className="step-select-method"
                 size="small"
                 onChange={ (e) => selectParamHandler(e,p.name,p)}>{
                    p.selection.map( (elm,index) => {
                        return(<Option value={elm.name} key={elm.name} className="step-select-method">
                            <Tooltip title={elm.tip}>
                                {elm.label}
                            </Tooltip>
                            </Option>);
                    })
                }
            </Select>
        </Col>
        
        </Row>
       
    );
}else{
    return(
        <Row>
        <Row key={p.label}>
        <Col span={10}>
        <Tooltip title={p.tip}>{p.label}</Tooltip>
        </Col>
        <Col span={10}>
            <Select placeholder="Default value"
                 value={p.selection[p.value].name}
                 className="step-select-method"
                 size="small"
                 onChange={ (e) => selectParamHandler(e,p.name,p)}>{
                    p.selection.map( (elm,index) => {
                        return(<Option value={elm.name} key={elm.name} className="step-select-method">
                            <Tooltip title={elm.tip}>
                                {elm.label}
                            </Tooltip>
                           {/* if(elm.label==='User Defined Strain'){
                            setStrain(true)
                    } */}

                           )
                            </Option>);
                    })
                   
                }
                
            </Select>
        </Col>
        
        </Row>

        <Row>{
            
        p.selection.map( (elm,index) => {
if('selection' in p && p.label==="Averaging Limit"&&elm.label==='User Defined Strain'){

return( <>
                    <Row key={elm.params[0].label}>
                    <Col span={10}>  
                    <Tooltip title="">{elm.params[0].label}</Tooltip></Col>
                    <Col span={10}>
                        <InputNumber
                            key={elm.params[0].name}
                            className="step-input-parameter"
                            size="small"
                            // min= {p.range.min}
                            // max= {p.range.max}
                            defaultValue={elm.params[0].value}
                            onChange={ (event: any) => changeParamHandler(event,elm.params[0].name)}
                        />                       
                    </Col>
                    </Row> 
                </>)};
}

)}</Row>  
    </Row>
                      

    )
}
            // }
        } else if ('range' in p) {
            return(
                <Row key={p.label}>
                <Col span={10}> 
                <Tooltip title={p.tip}>{p.label}</Tooltip></Col>
                <Col span={10}>
                    <InputNumber
                        key={p.label}
                        className="step-input-parameter"
                        size="small"
                        min= {p.range.min}
                        max= {p.range.max}
                        defaultValue={p.value}
                        onChange={ (event: any) => changeParamHandler(event,p.name)}
                    />                       
                </Col>
                </Row>
            );
        
            // else{) 
            }else {
            let step: number = 1;
            if(p.float)
              step =  ((p.value!==undefined&&p.value!==0)?Math.pow(10,(Math.floor(Math.log10(Math.abs(p.value)))-1)):1);
            if(p.conditional){ // show if in the linked array
                const t = linked.find( e => e.parameter===p.conditional);
                let ii = -1;
                if(t){
                    ii = t.value.findIndex( e => e===p.name)
                }
                if(ii!==-1){
                    return(
                        <Row key={p.label}>
                        <Col span={10}>
                        <Tooltip title={p.tip}> {p.label}</Tooltip>
                        </Col>
                        <Col span={10}>
                        <InputNumber
                            key={p.name}
                            className="step-input-parameter"
                            size="small"
                            defaultValue={p.value}
                            step={step}
                            onChange={  (event:any) => changeParamHandler(event,p.name)}
                        />
                        </Col>
                        <Col span={4}></Col>
                        </Row>
                    );
                }
            } else  {
                return(
                   <Row key={p.label}>
                   <Col span={10}>
                    <Tooltip title={p.tip}>{p.label}</Tooltip>
                    </Col>
                   <Col span={10}>
                   <InputNumber
                       key={p.name}
                       style={fontStyle}
                       size="small"
                       defaultValue={p.value}
                       step={step}
                       onChange={  (event:any) => changeParamHandler(event,p.name)}
                   />
                   </Col>
                   <Col span={4}></Col>
                   </Row>
               );
            }
        }

    }
    const displayAdvancedParameters = params.map( p => {
        console.log("result",p);
        if(( header as string ==='Show Less Options') && !('selection' in p)){
            // <Select placeholder="Default value"
            //              value={p.selection[p.value].name}
            //              className="step-select-method"
            //              size="small"
            //              onChange={ (e) => selectParamHandler(e,p.name,p)}>{
            //                 p.selection.map( (elm,index) => {
            //                     return(<Option value={elm.name} key={elm.name} className="step-select-method">
            //                         <Tooltip title={elm.tip}>
            //                             {elm.label}
            //                         </Tooltip>
            //                         </Option>);
            //                 })
            //             }
            //         </Select>
            // if(( header as string ==='Show Less Options')){

            return displayParameter(p);
        }    
       
    }
    );
    const displayParameters = params.map( p => {
        if('advanced' in p === false && action !== 'Averaging'){
            return displayParameter(p);
        }      
        if((action === 'Averaging') && ('selection' in p)){
        
           return  displayParameter(p);
        }
         
    }
    );

   

    const submit = (e: any) => {
        e.preventDefault();
        onChangeParameter(params,true);
        setParams([]);
    };

    const onChange = (key: string | string[]) => {
        if(key.length){
            setHeader('Show Less Options')
        }else{
            setHeader('Show More Options')

        }
      };

    const resetPoints = (e: any) => {
        removeAllPoints();
    }
       // <div  style={{...fontStyle,height: '270px',borderStyle: 'dashed', borderWidth: '0px', paddingBottom: '0px',paddingLeft: '7px'}} >

    return(
        <>
        <div className = "display-parameters-forms">
        {action==='Averaging' && method != 'None' && <div>
        <Collapse bordered={false}         onChange={onChange}
        ghost style={{ fontSize: '12px'}}>
            <Collapse.Panel key='advanced' header={header} >
                {displayAdvancedParameters}
            </Collapse.Panel>
        </Collapse>
         {/* <div style={{display:'flex',flexDirection:'row'}}>
         <h4 style={{marginRight:"20px"}}>Averaging Limit</h4> */}
             {/* <Select value={props.selected_method} size="small" className="step-select-method"  onChange={changeMethodHandler} >{
                     props.methods.map( met => {
                         return(
                                 <Option key={met.type} value={met.type} className="step-select-method">
                                     <Tooltip title={met.tip}>
                                         {met.label}
                                     </Tooltip>
                                 </Option>
                     
                                 
                         );
                     })
                 }
             </Select> */}
             {/* </div> */}
             </div>


        
        }   
        {displayParameters}
        <br/>
       
        </div>
        <div>
        <Space style={{ float: 'right', paddingRight: '7px', paddingBottom: '10px'}}>
            <Button style={{fontSize: '12px'}} size="small" type="primary" onClick={submit}>{actionLabel}</Button>
        </Space>
        {(action==='Cleaning_ends'&&method==='Max_Xs')&&
        <Space style={{ float: 'right', paddingRight: '10px',  paddingBottom: '10px'}}>
            <Button style={{fontSize: '12px'}} size="small" type="primary" onClick={resetPoints}>Remove Points</Button>
        </Space> 
        }

{(action === "Cleaning_begins" && method === "Min_Xs") && 
          <Space
            style={{
              float: "right",
              paddingRight: "10px",
              paddingBottom: "10px",
            }}
          >
            <Button
              style={{ fontSize: "12px" }}
              size="small"
              type="primary"
              onClick={resetPoints}
            >
              Remove Points
            </Button>
          </Space>
        }
    
        </div>
        </>
    );

};

export default DisplayParametersFroms;