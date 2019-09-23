import React, { Component } from 'react'

export const GeneralBSTBody = (
    columnFunction, keyFunction, data, hasManagementCell, managementCellFunction,clickFn) => {
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
                    tableContent.push(
                        <tr key={keyFunction(record) + ''}  onClick={()=>{clickFn(record)}}>
                            {columns}
                        </tr>
                    );
                }
            })
        }
        return tableContent;
    }