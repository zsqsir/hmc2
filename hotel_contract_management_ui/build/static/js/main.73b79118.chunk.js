(this.webpackJsonphotel_contract_management_ui=this.webpackJsonphotel_contract_management_ui||[]).push([[0],{19:function(e,t,c){},40:function(e,t,c){},41:function(e,t,c){"use strict";c.r(t);var o=c(1),a=c.n(o),n=c(14),l=c.n(n),r=(c(19),c(2)),s=c.n(r),i=c(0);var d=e=>{let{hotels:t=[],setHotels:c}=e;const[a,n]=Object(o.useState)(null),[l,r]=Object(o.useState)(""),[d,h]=Object(o.useState)(""),j=Object(o.useCallback)((async e=>{try{(await s.a.get("http://localhost:8000/hotels/".concat(e,"/rooms"))).data.length>0?alert("This hotel has rooms and cannot be deleted."):(await s.a.delete("http://localhost:8000/hotels/".concat(e)),c((t=>t.filter((t=>t.id!==e)))),console.log("Deleted hotel with id: ".concat(e)))}catch(t){console.error("Error deleting hotel",t)}}),[c]),u=async()=>{try{const e={name:l,facilities:d};await s.a.put("http://localhost:8000/hotels/".concat(a),e),c((t=>t.map((t=>t.id===a?{...t,...e}:t)))),n(null),console.log("Updated hotel with id: ".concat(a))}catch(e){console.error("Error updating hotel",e)}},p=()=>{n(null)};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Hotel List"}),Object(i.jsx)("ul",{children:0===t.length?Object(i.jsx)("p",{children:"No hotels available"}):t.map((e=>Object(i.jsx)("li",{children:a===e.id?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("input",{type:"text",value:l,onChange:e=>r(e.target.value),placeholder:"Hotel Name"}),Object(i.jsx)("input",{type:"text",value:d,onChange:e=>h(e.target.value),placeholder:"Hotel Facilities"}),Object(i.jsx)("button",{onClick:u,children:"Save"}),Object(i.jsx)("button",{onClick:p,children:"Cancel"})]}):Object(i.jsxs)(i.Fragment,{children:[e.name," - ",e.facilities,Object(i.jsx)("button",{onClick:()=>(e=>{n(e.id),r(e.name),h(e.facilities)})(e),children:"Edit"}),Object(i.jsx)("button",{onClick:()=>j(e.id),children:"Delete"})]})},e.id)))})]})};var h=e=>{let{addHotel:t}=e;const[c,a]=Object(o.useState)({name:"",facilities:""}),n=e=>{const{name:t,value:c}=e.target;a((e=>({...e,[t]:c})))};return Object(i.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const e=await s.a.post("http://localhost:8000/hotels/",c);t(e.data),a({name:"",facilities:""})}catch(o){console.error("Error adding hotel:",o)}},children:[Object(i.jsx)("input",{name:"name",value:c.name,onChange:n,placeholder:"Hotel Name",required:!0}),Object(i.jsx)("input",{name:"facilities",value:c.facilities,onChange:n,placeholder:"Facilities"}),Object(i.jsx)("button",{type:"submit",children:"Add Hotel"})]})};var j=e=>{let{roomId:t,onSuccess:c,selectedHotelId:a}=e;const[n,l]=Object(o.useState)({hotel_id:a,room_type:"",occupancy_adults:"",occupancy_kids:"",allocation:"",facilities:"",board:"",kids_supplement:"",third_bed_supplement:"",fourth_bed_supplement:""}),[r,d]=Object(o.useState)("");Object(o.useEffect)((()=>{t&&s.a.get("http://localhost:8000/rooms/".concat(t)).then((e=>l(e.data))).catch((e=>console.error("Error fetching room:",e)))}),[t]);const h=e=>{l({...n,[e.target.name]:e.target.value})};return Object(i.jsxs)("form",{onSubmit:e=>{e.preventDefault();(t?s.a.put("http://localhost:8000/rooms/".concat(t),n):s.a.post("http://localhost:8000/rooms",{...n,hotel_id:a})).then((()=>{c(),d("Room saved successfully!"),setTimeout((()=>d("")),3e3),l({hotel_id:a,room_type:"",occupancy_adults:"",occupancy_kids:"",allocation:"",facilities:"",board:"",kids_supplement:"",third_bed_supplement:"",fourth_bed_supplement:""})})).catch((e=>console.error("Error saving room:",e)))},children:[t?Object(i.jsx)("h3",{children:"Edit Room"}):Object(i.jsx)("h3",{children:"Add Room"}),r&&Object(i.jsx)("p",{children:r}),Object(i.jsx)("input",{type:"text",name:"room_type",value:n.room_type,onChange:h,placeholder:"Room Type"}),Object(i.jsx)("input",{type:"number",name:"occupancy_adults",value:n.occupancy_adults,onChange:h,placeholder:"Occupancy Adults"}),Object(i.jsx)("input",{type:"number",name:"occupancy_kids",value:n.occupancy_kids,onChange:h,placeholder:"Occupancy Kids"}),Object(i.jsx)("input",{type:"text",name:"allocation",value:n.allocation,onChange:h,placeholder:"Allocation"}),Object(i.jsx)("input",{type:"text",name:"facilities",value:n.facilities,onChange:h,placeholder:"Facilities"}),Object(i.jsx)("input",{type:"text",name:"board",value:n.board,onChange:h,placeholder:"Board"}),Object(i.jsx)("input",{type:"number",name:"kids_supplement",value:n.kids_supplement,onChange:h,placeholder:"Kids Supplement"}),Object(i.jsx)("input",{type:"number",name:"third_bed_supplement",value:n.third_bed_supplement,onChange:h,placeholder:"Third Bed Supplement"}),Object(i.jsx)("input",{type:"number",name:"fourth_bed_supplement",value:n.fourth_bed_supplement,onChange:h,placeholder:"Fourth Bed Supplement"}),Object(i.jsx)("button",{type:"submit",children:"Save Room"})]})};var u=e=>{let{hotels:t}=e;const[c,a]=Object(o.useState)([]),[n,l]=Object(o.useState)(""),[r,d]=Object(o.useState)(null);Object(o.useEffect)((()=>{n?s.a.get("http://localhost:8000/rooms?hotel_id=".concat(n)).then((e=>a(e.data))).catch((e=>console.error("Error fetching rooms:",e))):a([])}),[n]);const h=Object(o.useCallback)((async e=>{try{(await s.a.get("http://localhost:8000/rooms/".concat(e,"/room_rates"))).data.length>0?alert("This room has rates and cannot be deleted."):(await s.a.delete("http://localhost:8000/rooms/".concat(e)),a((t=>t.filter((t=>t.id!==e)))),console.log("Deleted room with id: ".concat(e)))}catch(t){console.error("Error deleting room",t)}}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Rooms"}),Object(i.jsxs)("select",{onChange:e=>l(e.target.value),value:n,children:[Object(i.jsx)("option",{value:"",children:"Select Hotel"}),t.map((e=>Object(i.jsx)("option",{value:e.id,children:e.name},e.id)))]}),Object(i.jsx)(j,{roomId:r,onSuccess:()=>{d(null),n&&s.a.get("http://localhost:8000/rooms?hotel_id=".concat(n)).then((e=>a(e.data))).catch((e=>console.error("Error fetching rooms:",e)))},selectedHotelId:n}),Object(i.jsx)("ul",{children:c.map((e=>Object(i.jsxs)("li",{children:[e.room_type," - ",e.facilities,Object(i.jsx)("button",{onClick:()=>{return t=e.id,void d(t);var t},children:"Edit"}),Object(i.jsx)("button",{onClick:()=>h(e.id),children:"Delete"})]},e.id)))})]})};c(40);var p=()=>{const[e,t]=Object(o.useState)([]),[c,a]=Object(o.useState)(!0),[n,l]=Object(o.useState)([]),[r,d]=Object(o.useState)([]),[h,j]=Object(o.useState)({hotel_id:"",room_id:"",start_date:"",end_date:"",min_price:"",max_price:"",occupancy_adults:"",occupancy_kids:"",sort_by:""});Object(o.useEffect)((()=>{h.hotel_id?(async e=>{try{const t=await s.a.get("http://localhost:8000/rooms/",{params:{hotel_id:e}});d(t.data)}catch(t){console.error("Error fetching rooms",t)}})(h.hotel_id):d([]),(async()=>{try{const e=await s.a.get("http://localhost:8000/hotels/");l(e.data)}catch(e){console.error("Error fetching hotels",e)}})()}),[h.hotel_id]),Object(o.useEffect)((()=>{(async()=>{try{const e=await s.a.get("http://localhost:8000/room_rates/",{params:h});console.log("Fetched data:",e.data),t(e.data),a(!1)}catch(e){console.error("Error fetching room rates",e),a(!1)}})()}),[h]);const u=e=>{const{name:t,value:c}=e.target;j({...h,[t]:c})};if(c)return Object(i.jsx)("p",{children:"Loading..."});const p=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"});return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Room Rates"}),Object(i.jsxs)("form",{children:[Object(i.jsxs)("select",{name:"hotel_id",onChange:u,value:h.hotel_id,children:[Object(i.jsx)("option",{value:"",children:"Select Hotel"}),n.map((e=>Object(i.jsx)("option",{value:e.id,children:e.name},e.id)))]}),Object(i.jsxs)("select",{name:"room_id",onChange:u,value:h.room_id,children:[Object(i.jsx)("option",{value:"",children:"Select Room"}),r.map((e=>Object(i.jsx)("option",{value:e.id,children:e.room_type},e.id)))]}),Object(i.jsx)("input",{type:"date",name:"start_date",placeholder:"Start Date",onChange:u,value:h.start_date}),Object(i.jsx)("input",{type:"date",name:"end_date",placeholder:"End Date",onChange:u,value:h.end_date}),Object(i.jsx)("input",{type:"number",name:"min_price",placeholder:"Min Price",onChange:u,value:h.min_price}),Object(i.jsx)("input",{type:"number",name:"max_price",placeholder:"Max Price",onChange:u,value:h.max_price}),Object(i.jsx)("input",{type:"number",name:"occupancy_adults",placeholder:"Occupancy Adults",onChange:u,value:h.occupancy_adults}),Object(i.jsx)("input",{type:"number",name:"occupancy_kids",placeholder:"Occupancy Kids",onChange:u,value:h.occupancy_kids}),Object(i.jsxs)("select",{name:"sort_by",onChange:u,value:h.sort_by,children:[Object(i.jsx)("option",{value:"",children:"Sort By"}),Object(i.jsx)("option",{value:"price",children:"Price (Low to High)"}),Object(i.jsx)("option",{value:"-price",children:"Price (High to Low)"})]}),Object(i.jsx)("button",{type:"button",onClick:()=>j({...h}),children:"Search"})]}),Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Hotel Name"}),Object(i.jsx)("th",{children:"Room Type"}),Object(i.jsx)("th",{children:"Price"}),Object(i.jsx)("th",{children:"Start Date"}),Object(i.jsx)("th",{children:"End Date"}),Object(i.jsx)("th",{children:"Occupancy Adults"}),Object(i.jsx)("th",{children:"Occupancy Kids"}),Object(i.jsx)("th",{children:"Actions"})]})}),Object(i.jsx)("tbody",{children:e.map((c=>Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:c.hotel_name}),Object(i.jsx)("td",{children:c.room_type}),Object(i.jsx)("td",{children:p.format(c.price)}),Object(i.jsx)("td",{children:new Date(c.start_date).toLocaleDateString()}),Object(i.jsx)("td",{children:new Date(c.end_date).toLocaleDateString()}),Object(i.jsx)("td",{className:"right-align",children:c.occupancy_adults}),Object(i.jsx)("td",{className:"right-align",children:c.occupancy_kids}),Object(i.jsx)("td",{children:Object(i.jsx)("button",{onClick:()=>(async c=>{try{await s.a.delete("http://localhost:8000/room_rates/".concat(c)),t(e.filter((e=>e.id!==c))),console.log("Deleted room rate with id: ".concat(c))}catch(o){console.error("Error deleting room rate",o)}})(c.id),children:"Delete"})})]},c.id)))})]})]})};var b=()=>{const[e,t]=Object(o.useState)([]),[c,a]=Object(o.useState)([]),[n,l]=Object(o.useState)({room_id:"",start_date:"",end_date:"",price:""});Object(o.useEffect)((()=>{(async()=>{try{const e=await s.a.get("http://localhost:8000/hotels/");t(e.data)}catch(e){console.error("Error fetching hotels",e)}})()}),[]);const r=e=>{const{name:t,value:c}=e.target;l({...n,[t]:c})};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Add Room Rate"}),Object(i.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{await s.a.post("http://localhost:8000/room_rates/",n),alert("Room rate added successfully")}catch(t){console.error("Error adding room rate",t)}},children:[Object(i.jsxs)("select",{name:"hotel_id",onChange:async e=>{const t=e.target.value;l({...n,room_id:""});try{const e=await s.a.get("http://localhost:8000/rooms/",{params:{hotel_id:t}});a(e.data)}catch(c){console.error("Error fetching rooms",c)}},children:[Object(i.jsx)("option",{value:"",children:"Select Hotel"}),e.map((e=>Object(i.jsx)("option",{value:e.id,children:e.name},e.id)))]}),Object(i.jsxs)("select",{name:"room_id",onChange:r,value:n.room_id,children:[Object(i.jsx)("option",{value:"",children:"Select Room"}),c.map((e=>Object(i.jsx)("option",{value:e.id,children:e.room_type},e.id)))]}),Object(i.jsx)("input",{type:"date",name:"start_date",placeholder:"Start Date",onChange:r,required:!0}),Object(i.jsx)("input",{type:"date",name:"end_date",placeholder:"End Date",onChange:r,required:!0}),Object(i.jsx)("input",{type:"number",step:"0.01",name:"price",placeholder:"Price",onChange:r,required:!0}),Object(i.jsx)("button",{type:"submit",children:"Add Room Rate"})]})]})};var m=()=>{const[e,t]=Object(o.useState)([]),[c,a]=Object(o.useState)(!0),[n,l]=Object(o.useState)(!1);Object(o.useEffect)((()=>{(async()=>{try{const e=await s.a.get("http://localhost:8000/hotels/");t(e.data)}catch(e){console.error("Error fetching hotels",e)}finally{a(!1)}})()}),[]);return c?Object(i.jsx)("p",{children:"Loading..."}):Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Hotel and Room Management"}),Object(i.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"20px"},children:[Object(i.jsx)(h,{addHotel:e=>{t((t=>[...t,e]))}}),Object(i.jsx)("button",{onClick:()=>{l((e=>!e))},children:n?"Hide Hotel List":"Show Hotel List"})]}),n&&Object(i.jsx)(d,{hotels:e,setHotels:t}),Object(i.jsx)(u,{hotels:e}),Object(i.jsx)("h1",{children:"Room Rate Management"}),Object(i.jsx)(b,{}),Object(i.jsx)(p,{})]})};l.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(m,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.73b79118.chunk.js.map