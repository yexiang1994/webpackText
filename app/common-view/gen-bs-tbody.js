import React, { Component } from 'react'
import CommonUtils from '../common-utils'

export const GeneralBSTBody = (
    columnFunction, keyFunction, data, hasManagementCell, managementCellFunction, doSelectClick,warningClick) => {
        let tableContent = [];
        if(data != null && Array.isArray(data)){
            data.map((record) => {
                if(columnFunction != null && Array.isArray(columnFunction)){
                    let columns = [];
                    columnFunction.map((column, index)=>{
	                    columns.push(
		                    <td
			                    key={keyFunction(record) + "-col-" + index}
		                    >
			                    {column(record)}
		                    </td>
	                    );
                    });
                    if(hasManagementCell){
                        columns.push(
                            <td
                                key={keyFunction(record) + "-col-manage"}
                            >
                                {managementCellFunction(record)}
                            </td>
                        );
                    }
	                if(record.warningType && record.warningType === "Intrusion"){
		                tableContent.push(
			                <tr key={keyFunction(record) + ''}
			                    style={{cursor:"pointer"}}
			                    onClick={warningClick ? () => {warningClick(record)} : ()=>{}}>
				                {columns}
			                </tr>
		                );
	                }else{
		                tableContent.push(
			                <tr key={keyFunction(record) + ''}
			                    className={`${record.select ? 'tr-select' : ''}`}
			                    onClick={doSelectClick ? (e) => { doSelectClick(record,e)} :''}>
				                {columns}
			                </tr>
		                );
	                }
                }
            })
        }
        return tableContent;
    }