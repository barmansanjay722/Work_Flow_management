
export const columnParsers = (res) => {
    if(res && res.data){
        res=res.data
    }
    if(!res){
        return []
    }
    let retData = {};
    for(let a in res){
      retData[a] = {
        label: res[a]['label'],
        reportChecked: false,
        filterChecked: false,
        filterType: res[a]['inputType'],
        type: res[a]['type'],
        key: a,
        value: '',
        encrypted:res[a]['encrypted']??false,
        min: res[a]['min']??0,
        max: res[a]['max']??null,
        duplicate: res[a]['duplicate']??false,
        multiselect: res[a]['multiselect']??true
      };
    }
    retData.hours.reportChecked = true
    retData.date.reportChecked = true
    retData.unique_task_no.reportChecked = true
    return retData;
}

