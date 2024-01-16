import moment from "moment"

export const productivityGraphParser = (res) => {
    if (!res) {
        return []
    }
    if (res && res.data) {
        res = res.data
    }

    // average_time_to_code_chart
    let avgTimeCodeValue = []
    let avgTimeCodeSpec = []

    // volume_per_day
    let volumeDayValue = []
    let volumeDaySpec = []

    // rework
    let reworkValue = []
    let reworkSpec = []

    let avgTimeCode = res?.average_time_to_code_chart ?? []
    let volumeDay = res?.volume_per_day ?? []
    let rework = res?.rework ?? []



    avgTimeCode.forEach((item, i) => {

        avgTimeCodeValue.push(item.average_time)
        avgTimeCodeSpec.push(item.spec_name)
    })

    volumeDay.forEach((item, i) => {
        volumeDaySpec.push(item.spec_name)
        volumeDayValue.push(item.count)

    })

    rework?.forEach((item, i) => {

        reworkSpec.push(item.spec_name)
        reworkValue.push(item.percentage)
    })
    return {
        avgTimeCode: {
            spec_name: avgTimeCodeSpec,
            value: avgTimeCodeValue
        },
        volumeDay: {
            spec_name: volumeDaySpec,
            value: volumeDayValue
        },
        rework: {
            spec_name: reworkSpec,
            value: reworkValue
        }
    }

}
export const allocatedStatsParser = (res) => {
    if (!res) {
        return []
    }
    if (res && res.data) {
        res = res.data
    }
    let result = {}
    for(let a in res){
        result[a] = {}
        result[a]['values'] = []
        result[a]['keys'] = []
        result[a]['absoluteValues'] = []
        res[a].forEach((item)=> {
            if(item.value && item.key){
                if(a==='progress_to_date'){

                    result[a]['values'].push(item.value)
                    result[a]['keys'].push(moment(item.key).format("DD MMM"))
                }else{

                    result[a]['values'].push(item.value)
                    result[a]['absoluteValues'].push(item.absoluteValue)
                    result[a]['keys'].push(item.key)
                }
            }
        })
    }
    return result


}
export const unallocatedGraphParser = (res) => {
    if (!res) {
        return []
    }
    if (res && res.data) {
        res = res.data
    }
  let by_date_recieved = {
    keys: [],
    values: []
  }
  let by_date_service = {
    keys: [],
    values: []
  }
  let by_speciality = {
    keys: [],
    values: []
  }

  let by_worklist  = {
    keys: [],
    values: []
  }

  if(res.by_date_recieved){
    res.by_date_recieved?.forEach((item)=> {
        if(item.received_date && item.count){
        by_date_recieved.keys.push(moment(item.received_date).format("DD MMM"))
        by_date_recieved.values.push(item.count)
        }
    })
  }

  if(res.by_date_service){
    res.by_date_service?.forEach((item)=> {
        if(item.date_of_service && item.count){

        by_date_service.keys.push(moment(item.date_of_service).format("DD MMM"))
        by_date_service.values.push(item.count)
        }
    })
  }
  if(res.by_speciality){
    res.by_speciality?.forEach((item)=> {
        if(item['Specialty.spec_name'] && item.count){

        by_speciality.keys.push(item['Specialty.spec_name'])
        by_speciality.values.push(item.count)
        }
    })
  }
  if(res.by_worklist){
    res.by_worklist?.forEach((item)=> {
        if(item.worklist_no && item.no_of_charts){

        by_worklist.keys.push(item.worklist_no)
        by_worklist.values.push(item.no_of_charts)
        }
    })
  }






    return {
        by_date_recieved,
        by_date_service,
        by_worklist,
        by_speciality,
        unallocated_volume : res.unallocated_volume
    }


}