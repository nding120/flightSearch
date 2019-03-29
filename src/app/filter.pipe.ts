import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: any, filterString: string, propName:string): any {
  //   //console.log(value.length);//12
  //   if(value.length===0||filterString===""){// sometimes value代表的数组或者obj没有长度这个属性
  //     return value;
  //   }
  //   const resultArray=[];
  //   for(let item of value){
  //     if(item[propName]===filterString){
  //       resultArray.push(item);
  //     }
  //   }
  //   return resultArray;
  // }

  transform(value:any, filterString:string, keyword:string): any{
    if(!filterString||!keyword){
      return value;
    }

    return value.filter(item=>{
      let filterStringValue=item[filterString];
      //item 是所有集合的元素，就是value中的props，
      // filterString会被定义为根据x属性过滤信息，把过滤后的值传给value
      return filterStringValue.indexOf(keyword) >=0; //if yes, return true.
    })
  }
}
 