
var lun = new Lunar(); //月历全局对象
var curJD; //现在日期
var curTZ; //当前时区

function showHXK0(){ //显示恒星库名称例表
 var i,n,c;
 for(i=0;i<HXK.length;i++){
  n = HXK[i].indexOf('#');
  addOp(document.all.Cf_xk,i,HXK[i].substr(0,n));
 }
 for(i=0;i<xz88.length;i+=5){
  addOp(document.all.Cf_xk, i+1000, xz88[i].substr(0,3));
 }
}
function showHXK(ind){ //显示恒星库
 ind -= 0;
 var bt='   RA(时分秒)   DEC(度分秒)   自行1  自行2  视差  星等  星名  星座', r='';
 if(ind<100){
  r = HXK[ind];
  var n = r.indexOf('#');
  r = r.substr(n, r.length-n); //去除第一行
 }
 else if(ind>=1000){
  r = schHXK( xz88[ind-1000].substr(3,3) );
 }
 Cf_db.value = bt + r.replace(/\#/g,'\r\n');
}
showHXK0();
showHXK(0);
function aCalc(){ //恒星计算
 var jd = JD.JD( year2Ayear(Cf_y.value), Cf_m.value-0, (Cf_d.value-0)+timeStr2hour(Cf_t.value)/24 ) - J2000;  //取屏幕时间
 if(Cf_ut.checked) jd += curTZ/24+dt_T(jd); //转为力学时
 var dt = Cf_dt.value-0, n = Cf_n.value-0;
 var Q  = Cf_nsn.checked ? 35 : 0;                     //小于35天的称短周期项
 var lx = Cf_lx.options[Cf_lx.selectedIndex].value-0;  //坐标类型
 var L  = Cf_J.value/180*Math.PI; //地标
 var fa = Cf_W.value/180*Math.PI;
 var i,s = '', F = getHXK(Cf_db.value,0);
 for(i=0; i<n; i++, jd+=dt)
   s += hxCalc(jd/36525,F,Q, lx, L,fa);
 Cf_xl.value = s;
}
function txFormatT(t){ //天象时间格式化输出
  var t1 = t*36525 + J2000;
  var t2 = t1  - dt_T(t1-J2000) - curTZ/24;
  return JD.JD2str(t1) +' TD '
       + JD.JD2str(t2).substr(9,11) +' UT ';
}
function tianXiang(xm,xm2){
 var jd = JD.JD( year2Ayear(Ce_y.value), Ce_m.value-0, (Ce_d.value-0) ) - J2000;  //取屏幕时间
 var n=Ce_n.value-0;
 var s='',i,re;
 jd /= 36525;
 if(xm==1||xm==2){ //求月亮近远点
  for(i=0;i<n;i++,jd=re[0]+27.555/36525){
   if(xm==1) re=XL.moonMinR(jd,1); //求近点
   if(xm==2) re=XL.moonMinR(jd,0); //求远点
   s += txFormatT(re[0]) + re[1].toFixed(2)+'千米\r\n';
  }
 }
 if(xm==3||xm==4){ //求月亮升降交点
  for(i=0;i<n;i++,jd=re[0]+27.555/36525){
   if(xm==3) re=XL.moonNode(jd,1); //求升
   if(xm==4) re=XL.moonNode(jd,0); //求降
   s += txFormatT(re[0]) + rad2str(rad2mrad(re[1]),0)+'\r\n';
  }
 }
 if(xm==5||xm==6){ //求地球近远点
  for(i=0;i<n;i++,jd=re[0]+365.259636/36525){
   if(xm==5) re=XL.earthMinR(jd,1); //求近点
   if(xm==6) re=XL.earthMinR(jd,0); //求远点
   s += txFormatT(re[0]) + re[1].toFixed(8)+' AU\r\n';
  }
 }
 if(xm==7||xm==8){ //大距计算
  for(i=0;i<n;i++,jd=re[0]+115.8774777586/36525){
   if(xm==7) re=daJu(1,jd,1); //求水星东大距
   if(xm==8) re=daJu(1,jd,0); //求水星东西距
   s += txFormatT(re[0]) + (re[1]/Math.PI*180).toFixed(5)+'度\r\n';
  }
 }
 if(xm==9||xm==10){ //大距计算
  for(i=0;i<n;i++,jd=re[0]+583.9213708245/36525){
   if(xm==9) re=daJu(2,jd,1); //求水星东大距
   if(xm==10)re=daJu(2,jd,0); //求水星东西距
   s += txFormatT(re[0]) + (re[1]/Math.PI*180).toFixed(5)+'度\r\n';
  }
 }
 if(xm==11){ //合月计算
  s = '合月时间(TD UT) 星月赤纬差(小于1度可能月掩星,由视差决定)\r\n';
  for(i=0;i<n;i++,jd=re[0]+28/36525){
   re = xingHY(xm2,jd);
   s += txFormatT(re[0]) + (-re[1]/Math.PI*180).toFixed(5)+'度\r\n';
  }
 }
 if(xm==12||xm==13){
  if(xm==12) s = xxName[xm2]+'合日(地内行星上合)\r\n';
  if(xm==13) s = xxName[xm2]+'冲日(地内行星下合)\r\n';
  s +='黄经合/冲日时间(TD UT) 星日赤纬差\r\n';
  for(i=0;i<n;i++,jd=re[0]+cs_xxHH[xm2-1]/36525){
   if(xm==12) re = xingHR(xm2,jd,0);
   if(xm==13) re = xingHR(xm2,jd,1);
   s += txFormatT(re[0]) + (-re[1]/Math.PI*180).toFixed(5)+'度\r\n';
  }
 }
 if(xm==14||xm==15){ //顺留
  if(xm==14) s = xxName[xm2]+'顺留\r\n';
  if(xm==15) s = xxName[xm2]+'逆留\r\n';
  s +='留时间(TD UT)\r\n';
  for(i=0;i<n;i++,jd=re+cs_xxHH[xm2-1]/36525){
   if(xm==14) re = xingLiu(xm2,jd,1);
   if(xm==15) re = xingLiu(xm2,jd,0);
   s += txFormatT(re)+'\r\n';
  }
 }
 Ce_tab.value=s;
}

function pCalc(xm){ //行星星历计算
 var jd = JD.JD( year2Ayear(Cd_y.value), Cd_m.value-0, (Cd_d.value-0)+timeStr2hour(Cd_t.value)/24 ) - J2000;  //取屏幕时间
 if(Cd_ut.checked) jd += curTZ/24+dt_T(jd); //转为力学时
 var xt = Cd_xt.options[Cd_xt.selectedIndex].value;
 var dt = Cd_dt.value-0, n = Cd_n.value-0;
 var L  = Cd_J.value/180*Math.PI; //地标
 var fa = Cd_W.value/180*Math.PI;
 if(n>1000) {alert("个数太多了"); return;}
 var s='',i;
 //求星历
 for(i=0;i<n;i++,jd+=dt){
   var jd2=jd+2451545;
   s += JD.JD2str(jd2)+'TD, JED = '+jd2.toFixed(7)+' '+'\r\n';
   s += xingX(xt,jd,L,fa)+'\r\n';
 }
 Cd_tab.value=s;
 syncActivePageUrl(true);
}

//=============日月食图表===========

function zb_calc(){ //即时坐标计算
  if(Cal_pause.checked) return;
  var jd = (new Date())/86400000-10957.5; //J2000起算的儒略日数
  jd += dt_T(jd);
  msc.calc(jd, Cb_J.value/radd, Cb_W.value/radd,0); //传入力学时间(J2000.0起算)
  Cal_zb.innerHTML = msc.toHTML(1);
}

function zxsCopy(J,W){ //复制某时刻中心食地标，并计算该处日食
  Cb_J.value=J;
  Cb_W.value=W;
  tu_calc(2);
}

function tu_calc(ly){ //ly是取时间的方式,xm是计算的项目
 tu1.init(Can1); //画布初始化
 tu1.showzb();
 var jd; //J2000起算的儒略日数(当地时间)
 var vJ = Cb_J.value/radd;
 var vW = Cb_W.value/radd;
 //取时间
 jd = JD.JD( year2Ayear(Cb_y.value), Cb_m.value-0, (Cb_d.value-0)+timeStr2hour(Cb_t.value)/24 ) - J2000;  //取屏幕时间
 if(ly==0) jd = (new Date())/86400000-10957.5-curTZ/24, Cb_ut.checked=true; //取现在时间(UTC)
 if(Cal_rt.checked) window.setTimeout("tu_calc(0)", 200);
 if(ly==1) jd -= Cb_step.value/86400;
 if(ly==2); //常规取时间
 if(ly==3) jd += Cb_step.value/86400;
 if(ly==4) jd -=29.53;
 if(ly==5) ;
 if(ly==6) jd +=29.53;
 if(ly==7) jd -=29.53;
 if(ly==8) ;
 if(ly==9) jd +=29.53;
 if(ly==4||ly==5||ly==6) jd = XL.MS_aLon_t2( Math.floor((jd+8)/29.5306)*pi2 )*36525;
 if(ly==7||ly==8||ly==9) jd = XL.MS_aLon_t2( Math.floor((jd-4)/29.5306)*pi2+Math.PI )*36525;
 if(ly>=4&&ly<=9){
   if(Cb_ut.checked) jd -= curTZ/24+dt_T(jd);
 }

 //置时间
 var ts=JD.JD2str(jd+J2000);
 Cb_y.value = ts.substr(0,5)-0;
 Cb_m.value = ts.substr(6,2);
 Cb_d.value = ts.substr(9,2);
 Cb_t.value = ts.substr(12,8);

 if(Cb_ut.checked) jd += curTZ/24+dt_T(jd); //转为力学时
 var i;

 msc.calc(jd,vJ,vW,Cb_high.value-0);
 Cal_zb.innerHTML=msc.toHTML(1); //显示坐标

 var hzb;
 if(Cb_sjzb.checked){hzb='<table width="78.4%" class="bd0" cellpadding="0" cellspacing="0"><tbody><tr><td class="hzb" align="center" width="11.2%">45</td><td class="hzb" align="center" width="11.2%">90</td><td class="hzb" align="center" width="11.2%">135</td><td class="hzb" align="center" width="11.2%">180</td><td class="hzb" align="center" width="11.2%">-135</td><td class="hzb" align="center" width="11.2%">-90</td><td class="hzb" align="center" width="11.2%">-45</td></tr></tbody></table>';}else{if(Cb_bei.checked){hzb='<table width="78.4%" class="bd0" cellpadding="0" cellspacing="0"><tbody><tr><td class="hzb" align="center" width="11.2%">270</td><td class="hzb" align="center" width="11.2%">300</td><td class="hzb" align="center" width="11.2%">330</td><td class="hzb" align="center" width="11.2%">0</td><td class="hzb" align="center" width="11.2%">30</td><td class="hzb" align="center" width="11.2%">60</td><td class="hzb" align="center" width="11.2%">90</td></tr></tbody></table>';}else{hzb='<table width="78.4%" class="bd0" cellpadding="0" cellspacing="0"><tbody><tr><td class="hzb" align="center" width="11.2%">90</td><td class="hzb" align="center" width="11.2%">120</td><td class="hzb" align="center" width="11.2%">150</td><td class="hzb" align="center" width="11.2%">180</td><td class="hzb" align="center" width="11.2%">210</td><td class="hzb" align="center" width="11.2%">240</td><td class="hzb" align="center" width="11.2%">270</td></tr></tbody></table>';}}
  Cb_hzb.innerHTML = hzb;

 if(Cb_sjzb.checked){
  tu1.draw1b('sun', msc.sCJ,msc.sCW, msc.gst);
  tu1.draw1b('moon',msc.mCJ,msc.mCW, msc.gst);
 }else{
  tu1.draw1('sun', msc.sPJ,msc.sPW, Cb_bei.checked);
  tu1.draw1('moon',msc.mPJ,msc.mPW, Cb_bei.checked);
 }

 var msHJ = rad2mrad(msc.mHJ-msc.sHJ);
 var s='',J1,W1,J2,W2,  sr,mr,er,Er,d0,d1,d2;

 if(msHJ<3/radd || msHJ>357/radd){ //日食图表放大计算
  J1=msc.mCJ2,W1=msc.mCW2, J2=msc.sCJ2, W2=msc.sCW2;  //用未做大气折射的来计算日食
  sr=msc.sRad, mr=msc.mRad;
  d1=j1_j2(J1,W1,J2,W2)*rad,d0=mr+sr;
  tu1.draw2a(J1,W1,J2,W2,mr,sr);
  tu1.draw3(msc.zx_J,msc.zx_W,Cb_phSave.checked);
  s2 = '此刻月亮本影中心线不经过地球。';
  if(msc.zx_W!=100){
    var zxsJ=(msc.zx_J/Math.PI*180).toFixed(5);
    var zxsW=(msc.zx_W/Math.PI*180).toFixed(5);
    s2 = '<b>食心：</b><a title="切换到食心视角" href="javascript:zxsCopy('+zxsJ+','+zxsW+')">经度:'+ zxsJ  +'° 纬度:'+ zxsW+'°</a>';
  }

  s = '视半径 <font color=#B0A070>●</font>'+m2fm(mr,2,0)+' <font color=red>●</font>'+m2fm(sr,2,0)+' <font color=red>'+s2+'</font><br>'
    + '中心距 '+m2fm( d1,2,0 ) +' 半径和 '+m2fm(d0,2,0) + ' 半径差 ' + m2fm(sr-mr,2,0) +' 距外切 '+m2fm(d1-d0,2,0);
  Cb_zb.innerHTML = '<span class="cua">'+s+'</span>';

  //显示南北界数据
  rsPL.nasa_r=0; if(Cb_nasa.checked) rsPL.nasa_r=1; //视径选择
  s=JD.JD2str(jd+J2000)+' TD<br>南北界点：　经度°　　纬度°<br>',mc=new Array('食中心点','本影北界','本影南界','半影北界','半影南界');
  rsPL.nbj(jd);
  for(i=0;i<5;i++){
    s += mc[i]+'：';
    if(rsPL.V[i*2+1]==100) { s += '无　　　　　无<br>'; continue; }
    s += (rsPL.V[i*2]*radd).toFixed(5)+'　'+(rsPL.V[i*2+1]*radd).toFixed(5)+'<br>';
  }
  s += '中心类型：'+rsPL.Vc+'食<br>';
  s += '本影南北界距约'+rsPL.Vb;
  Cb_b2.innerHTML = s;

  //显示食甚等时间
  rsPL.nasa_r=0; if(Cb_nasa.checked) rsPL.nasa_r=1; //视径选择
  var td=' TD',mc=new Array('初亏','食甚','复圆','食既','生光');
  rsPL.secMax(jd, vJ,vW, Cb_high.value-0);
  if(rsPL.LX=='环') mc[3]='环食始',mc[4]='环食终'; //环食没有食既和生光
  var s='时间表 (日'+rsPL.LX+'食)<br>'
  for(i=0;i<5;i++){
   jd=rsPL.sT[i]; if(!jd) continue;
   if(Cb_ut.checked) jd -= curTZ/24+dt_T(jd),td=' UTC'; //转为UTC(地方时间)
   s+=mc[i]+':'+JD.JD2str(jd+J2000)+td+'<br>';
  }
  s+='时长: '+m2fm(rsPL.dur*86400,1,1)+'<br>';
  s+='食分: '+rsPL.sf.toFixed(5)+rsPL.sflx+'<br>';
  s+='月日视径比: '+rsPL.b1.toFixed(5)+'(全或环食分)<br>';
  s+='是否NASA径比(1是,0否): '+rsPL.nasa_r+'<br>';
  s+='食分指日面直径被遮比例';
  Cb_b1.innerHTML = s;
  if(!Cal_rt.checked) syncActivePageUrl(true);
  return;
 }
 if(msHJ>170/radd && msHJ<190/radd){ //月食图表放大计算
  J1=msc.mCJ,W1=msc.mCW, J2=msc.sCJ+Math.PI, W2=-msc.sCW;
  er=msc.eShadow, Er=msc.eShadow2, mr=msc.e_mRad; //用未做大气折射的来计算日食
  d1=j1_j2(J1,W1,J2,W2)*rad, d0=mr+er,d2=mr+Er;
  tu1.draw2b(J1,W1,J2,W2, mr,er,Er);
  s= '本影半径 '+m2fm(er,2,0)+' 半影半径 '+m2fm(Er,2,0)+' 月亮地心视半径 '+m2fm(mr,2,0)+'<br>'
    + '影月中心距 '+m2fm( d1,2,0 ) +' 影月半径和 '+m2fm(d0,2,0) +'<br>距相切 <font color=red>'+m2fm(d1-d0,2,0) +'</font> 距第二相切 '+m2fm(d1-d2,2,0) ;
  Cb_zb.innerHTML = s;

  //显示月食食甚等
  var td=' TD',mc=new Array('初亏','食甚','复圆','半影食始','半影食终','食既','生光');
  ysPL.lecMax(jd);
  var s='时间表(月'+ysPL.LX+'食)<br>';
  for(i=0;i<7;i++){
   jd=ysPL.lT[i]; if(!jd) continue;
   if(Cb_ut.checked) jd -= curTZ/24+dt_T(jd),td=' UTC'; //转为UTC(地方时间)
   s+=mc[i]+':'+JD.JD2str(jd+J2000)+td+'<br>';
  }
  s+='食分:'+ysPL.sf.toFixed(5)+'<br>';
  s+='食分指月面直径被遮比例';
  Cb_b1.innerHTML = s;
  Cb_b2.innerHTML = '';
  if(!Cal_rt.checked) syncActivePageUrl(true);
  return;
 }
 tu1.ecShow(0,0,0,0);
 Cb_zb.innerHTML = Cb_b1.innerHTML = Cb_b2.innerHTML = '';
 if(!Cal_rt.checked) syncActivePageUrl(true);
}
function tu_cls_path(){
 tu1.init(Can1);
 tu1.showzb();
 Cb_zb.innerHTML = '';
 Cb_b1.innerHTML = '';
 Cb_b2.innerHTML = '';
}

//==================日食概略图=================
function tu2_jxb(){ //显示界线表
 var jd = Cp10_jd.value-J2000; //取屏幕时间
 jd = XL.MS_aLon_t2( int2((jd+8)/29.5306)*Math.PI*2 )*36525; //归朔
 rsGS.init(jd,7);
 Cp10_tz.innerHTML=rsGS.jieX3(jd);
}
function tu2_xx(jd){ //转到详细日食图表页面
 //置时间
 var ts=JD.JD2str(jd+J2000);
 Cb_y.value = ts.substr(0,5)-0;
 Cb_m.value = ts.substr(6,2);
 Cb_d.value = ts.substr(9,2);
 Cb_t.value = ts.substr(12,8);
 Cb_ut.checked = false;
 showPage(3);
}
function tuGL_search(fs){ //查找日食
  var i,k,r,s='',s2='', n=Cp10_an.value-0;
  var jd = JD.JD( year2Ayear(Cp10_y.value), Cp10_m.value-0, 0) - J2000;  //取屏幕时间
  jd = XL.MS_aLon_t2( int2((jd+8)/29.5306)*Math.PI*2 )*36525; //定朔
  for(i=0,k=0;i<n;i++){
   r=ecFast(jd); //低精度高速搜索
   if(r.lx=='NN') { jd += 29.5306; continue; } //排除不可能的情况，加速计算
   if(!r.ac){
     if(fs==0) rsGS.init(jd, 2); //低精度
     if(fs==1) rsGS.init(jd, 7); //高精度
     r = rsGS.feature(jd);
   }
   if(r.lx!='N'){
    s += ' <a href="javascript:tu2_calc(1,'+r.jd+');">'+JD.JD2str(r.jd+J2000).substr(0,11)+'</a>';
    s += r.lx;
    k++;
    if(k%9==0) s+='<br>';
    if(k%100==0) s2+=s, s='';
   }
   jd = r.jd+29.5306;
  }
  Cp10_b1.innerHTML = s2+s;
}

var tu3_buff=0;
function tu2_calc(fs,jd0){
 tu2.init(Can2);
 if(fs==0) return;

 var step = Cp10_step.value-0;
 var jd = Cp10_jd.value-J2000; //取屏幕时间
 if(fs==1) jd = jd0;
 if(fs==2) ; //保持时间不变
 if(fs==3) jd -= step;
 if(fs==4) jd += step;
 jd = XL.MS_aLon_t2( int2((jd+8)/29.5306)*Math.PI*2 )*36525; //归朔
 Cp10_jd.value = Cp10_jd2.value = (jd+J2000).toFixed(6);    //保存在屏幕上
 Cp10_jdstr.innerHTML=JD.JD2str(jd+J2000); //显示时间串


 //计算单个日食
 if(fs==1||fs==2||fs==3||fs==4){

  rsGS.init(jd,7);
  var r = rsGS.feature(jd); //特征计算
  var lxb={T:'全食',A:'环食',P:'偏食',T0:'无中心全食',T1:'部分本影有中心全食',A0:'无中心环食',A1:'部分伪本影有中心全食',H:'全环全',H2:'全全环',H3:'环全全'};
  if(r.lx=='N') Cp10_tz.innerHTML='无日食';
  else Cp10_tz.innerHTML = '<table><tr>'
   + '<td class=dRig><b>本次日食概述(力学时)</b><br>'

   +                  '偏食始：'+JD.JD2str(r.gk3[2]+J2000)+' '+rad2str2(r.gk3[0])+','+rad2str2(r.gk3[1])+'<br>'
   + (r.gk1[2]!=0   ? '中心始：'+JD.JD2str(r.gk1[2]+J2000)+' '+rad2str2(r.gk1[0])+','+rad2str2(r.gk1[1])+'<br>' : '')
   + (r.gk5[1]!=100 ? '视午食：'+JD.JD2str(r.gk5[2]+J2000)+' '+rad2str2(r.gk5[0])+','+rad2str2(r.gk5[1])+'<br>' : '')
   + (r.gk2[2]!=0   ? '中心终：'+JD.JD2str(r.gk2[2]+J2000)+' '+rad2str2(r.gk2[0])+','+rad2str2(r.gk2[1])+'<br>' : '')
   +                  '偏食终：'+JD.JD2str(r.gk4[2]+J2000)+' '+rad2str2(r.gk4[0])+','+rad2str2(r.gk4[1])+'</td>'

   + '<td class=dRig><b>中心点特征</b><br>'
   + '影轴地心距 γ = '+r.D.toFixed(4)+'<br>'
   + '中心地标 (经,纬) = ' + (r.zxJ*radd).toFixed(2)    + ',' + (r.zxW*radd).toFixed(2)    + '<br>'
   + '中心时刻 tm = '+JD.JD2str(r.jd+J2000)+'<br>'
   + '太阳方位 (经,纬) = ' + (r.Sdp[0]*radd).toFixed(0) + ',' + (r.Sdp[1]*radd).toFixed(0) + '<br>'
   + '日食类型 LX = '+r.lx+' '+lxb[r.lx]+'<br>'
   + '食分='+r.sf.toFixed(4)+', 食延='+m2fm(r.tt*86400,0,2)+', 食带='+r.dw.toFixed(0)+'km<br>'
   + '</td>'
   + '</tr></table>';

  if(Cp10_showJX.checked){
    Can2.style.display='none';
    Can3.style.display='block';
    Can3_pan.style.display='block';
    tu3.init(Can3);
    tu3_buff=rsGS.jieX(jd); //取界线
    var J0=(tu3_buff.zxJ*radd).toFixed(0);
    var W0=(tu3_buff.zxW*radd).toFixed(0);
    Cp10_J0.value = J0;
    Cp10_W0.value = W0;
    var jb=[Cp10_x0.value/10, Cp10_y0.value/10, Cp10_dx.value/10, Cp10_dy.value/10];
    tu3.draw(tu3_buff, J0/radd, W0/radd, Cp10_eR.value-0, jb, Cp10_tylx.options.selectedIndex);
  }else{
    Can2.style.display='block';
    Can3.style.display='none';
    Can3_pan.style.display='none';
    tu2.line1([r],Cp10_hc.checked);
  }
  return;
 }

 //计算多个日食
 if(fs==5){
  Can2.style.display='block';
  Can3.style.display='none';
  Can3_pan.style.display='none';
  var i,r,rr=[], bn = Cp10_bn.value-0; //并设置为多步
  var s = '<table border="0" width="100%" cellpadding="0" cellspacing="0">'
        + '<tr align=center bgcolor="#F0F0F0"><td>力学时</td><td>γ</td><td>型</td><td>中心地标</td><td>方位角</td><td>食分</td><td>食带</td><td>食延</td><td>详表</td></tr>';
  for(i=0;i<bn;i++,jd+=step){
   rsGS.init(jd,3);  //中精度计算
   r = rsGS.feature(jd);
   if(r.lx=='N') continue;
   s += '<tr align=center><td>'
     + JD.JD2str(r.jd+J2000) + '</td><td>' + r.D.toFixed(4) + '</td><td>' + r.lx + '</td><td>'
     + (r.zxJ*radd).toFixed(2)    + ',' + (r.zxW*radd).toFixed(2)    + '</td><td>'
     + (r.Sdp[0]*radd).toFixed(0) + ',' + (r.Sdp[1]*radd).toFixed(0) + '</td><td>'
     + r.sf.toFixed(4) + '</td><td>' + r.dw.toFixed(0) + '</td><td>' + m2fm(r.tt*86400,0,2) + '</td><td>'
     + '<a href="javascript:tu2_xx('+r.jd+');">详细</a>'+ '</td><td>'
     + '</td></tr>';
   rr[rr.length] = r;
  }
  tu2.line1(rr,Cp10_hc.checked);
  s += '</table>';
  Cp10_tz.innerHTML = s;
 }
}

function tu3_xz(xm){ //旋转图3
 if(!tu3_buff) { alert('请把“食界”钩上并计算'); return; }
 tu3.init(Can3);
 var J0=Cp10_J0.value-0, W0=Cp10_W0.value-0;
 if(xm==0) J0 += 15;
 if(xm==1) J0 -= 15;
 if(xm==2) W0 += 15;
 if(xm==3) W0 -= 15;
 if(xm==4); //保持不变
 Cp10_J0.value = J0, Cp10_W0.value = W0;
 var jb=[Cp10_x0.value/10, Cp10_y0.value/10, Cp10_dx.value/10, Cp10_dy.value/10];
 tu3.draw(tu3_buff, J0/radd, W0/radd, Cp10_eR.value-0, jb, Cp10_tylx.options.selectedIndex);
}

function tu3_yingzi(xm){ //显示影子
 var jd = Cp10_jd2.value-J2000; //取屏幕时间
 if(xm==1) jd -= Cp10_step2.value/86400;
 if(xm==2) jd += Cp10_step2.value/86400;
 Cp10_jd2.value = (jd+J2000).toFixed(4);

 rsGS.init(jd,7);
 var r=rsGS.jieX2(jd);
 tu3.draw2(r);
}

function dfRS(ly){ //地方日食表生成
 var jd = JD.JD( year2Ayear(Cc_y.value), Cc_m.value-0, (Cc_d.value-0) ) - J2000;  //取屏幕时间
 if(ly==1) jd -=29.53;
 if(ly==2) jd +=29.53;
 jd = XL.MS_aLon_t2( Math.floor((jd+8)/29.5306)*pi2 )*36525;

 //置时间
 var ts=JD.JD2str(jd+J2000-curTZ/24-dt_T(jd));
 Cc_y.value = ts.substr(0,5)-0;
 Cc_m.value = ts.substr(6,2);
 Cc_d.value = ts.substr(9,2);

 rsPL.nasa_r=0; if(Cc_nasa.checked) rsPL.nasa_r=1; //视径选择
 var i,j,t,c,ou;
 if(navigator.userAgent.indexOf("Mobile") != -1){ou='地名      食分       初亏      食甚       复圆       食既       生光      日出       日落      P1,V1    P2,V2\r\n';}else{if(navigator.userAgent.indexOf("NT 6") != -1){ou='地名      食分      初亏      食甚       复圆      食既      生光      日出      日落     P1,V1    P2,V2\r\n';}else{ou='地名       食分      初亏      食甚       复圆      食既      生光       日出      日落     P1,V1    P2,V2\r\n';}}
 var s = Cc_db.value;
 s = s.replace(/\n/g,'#').replace(/[ \r]/g,'');
 s = s.split('#');
 for(i=0;i<s.length;i++){
  c=s[i];         if(c.length==0||c.substr(0,1)=='*') continue;
  c=c.split(','); if(c.length<=3) continue;
  c[2]/=radd, c[1]/=radd; //经纬度
  rsPL.secMax(jd,c[2],c[1],c[3]/1000); //日食计算
  if(rsPL.LX){ou += c[0]+'['+rsPL.LX+']';}else{ou += c[0]+'[　]';}
  ou += ' '+rsPL.sf.toFixed(5); //食分
  ou += rsPL.sflx;
  for(j=0;j<5;j++){ //初亏,食甚,复圆,食既,生光
   t  = rsPL.sT[j]; if(!t) {ou+='  --:--:--'; continue;}
   t = t - curTZ/24 -dt_T(t) +J2000; //转为UTC(地方时间)
   ou+='  '+JD.JD2str(t).substr(12,8);
  }
  ou += '  '+JD.timeStr(rsPL.sun_s -curTZ/24+J2000);
  ou += '  '+JD.timeStr(rsPL.sun_j -curTZ/24+J2000);
  ou += '  '+(rsPL.P1*radd).toFixed(0).padStart(3,' ')+','+(rsPL.V1*radd).toFixed(0).padStart(3,' ');
  ou += '  '+(rsPL.P2*radd).toFixed(0).padStart(3,' ')+','+(rsPL.V2*radd).toFixed(0).padStart(3,' ');
  ou += '\r\n';
 }
 Cc_tb.value = ou;
}

//====================升降表===================
function shengjiang(){
  SZJ.L  = Cp9_J.value/radd; //设置站点参数
  SZJ.fa = Cp9_W.value/radd;
  var jd = JD.JD( year2Ayear(Cp9_y.value), Cp9_m.value-0, (Cp9_d.value-0)+0.5 ) - J2000;  //取屏幕时间
  var sq = SZJ.L/pi2*24;

  var s="<font color=red>北京时间(转为格林尼治时间请减8小时)：</font><br>", r, c=J2000+8/24;

  r=SZJ.St(jd-sq/24);
  s +="太阳升起 " + JD.JD2str(r.s+c) + " 太阳降落 " + JD.JD2str(r.j+c)+"<br>";
  s +="日上中天 " + JD.JD2str(r.z+c) + " 日下中天 " + JD.JD2str(r.x+c)+"<br>";
  s +="民用天亮 " + JD.JD2str(r.c+c) + " 民用天黑 " + JD.JD2str(r.h+c)+"<br>";
  s +="航海天亮 " + JD.JD2str(r.c2+c)+ " 航海天黑 " + JD.JD2str(r.h2+c)+"<br>";
  s +="天文天亮 " + JD.JD2str(r.c3+c)+ " 天文天黑 " + JD.JD2str(r.h3+c)+"<br>";
  s +="日照时长 " + JD.timeStr(r.j-r.s-0.5) + "　　　　　　天光时长 " + JD.timeStr(r.h-r.c-0.5) + "<br>";
  if(r.sm) s += '注：'+r.sm+'<br>';
  r=SZJ.Mt(jd-sq/24);
  s +="月亮升起 " + JD.JD2str(r.s+c) + " 月亮降落 " + JD.JD2str(r.j+c)+"<br>";
  s +="月上中天 " + JD.JD2str(r.z+c) + " 月下中天 " + JD.JD2str(r.x+c)+"<br>";
  Cp9_out.innerHTML=s;
}
function shengjiang2(){ //太阳升降快算
  var L  = Cp9_J.value/radd; //设置站点参数
  var fa = Cp9_W.value/radd;
  var jd = JD.JD( year2Ayear(Cp9_y.value), 1, 1.5 ) - J2000;  //取屏幕时间
  var i,t, s='',s2='';
  for(i=0;i<368;i++){
    t=sunShengJ(jd+i,L,fa,-1)+J2000+8/24; s2+='<font color=red>'+JD.JD2str(t).substr(6,14)+'</font>，';
    t=sunShengJ(jd+i,L,fa, 1)+J2000+8/24; s2+=JD.timeStr(t)+'<br>';
    if(i== 91||i==275) s+='<td>'+s2+'<td>', s2='';
    if(i==183||i==367) s+='<td>'+s2+'<td>', s2='';
  }
  Cp9_out.innerHTML='<center><b>太阳年度升降表</b><table><tr>'+s+s2+'</tr></table></center>';
}
function shengjiang3(){ //年度时差
  var jd = JD.JD( year2Ayear(Cp9_y.value), 1, 1.5 );  //取屏幕时间
  var i,t,D, s='',s2='';
  for(i=0;i<368;i++){
    D=jd+i-8/24-J2000, D+=dt_T(D);
    t=pty_zty(D/36525); s2+=JD.JD2str(jd+i).substr(0,11)+' <font color=red>'+m2fm(t*86400,2,2)+'</font><br>';
    if(i== 91||i==275) s+='<td>'+s2+'<td>', s2='';
    if(i==183||i==367) s+='<td>'+s2+'<td>', s2='';
  }
  Cp9_out.innerHTML='<center><b>太阳时差表(所用时间为北京时间每日12点)<br</b><table><tr>'+s+s2+'</tr></table></center>';
}

//====================气朔表===================
function suoCalc(jiao){ //定朔测试函数
 if(jiao==-1) jiao=prompt("请输入角度(0朔,90上弦,180望,270下弦,或其它):",0)-0;
 var i,r,T,s = "月-日黄经差"+jiao+"<br>", s2="";
 var y = year2Ayear(Cp8_y.value)-2000;
 var n = Cp8_n.value-0;
 var n0 = int2(y*(365.2422/29.53058886)); //截止当年首经历朔望的个数
 for(i=0;i<n;i++){
  T = XL.MS_aLon_t( (n0+i+jiao/360)*2*Math.PI );  //精确时间计算,入口参数是当年各朔望黄经
  r = XL1_calc(2,T,-1); //计算月亮
  s2 += JD.JD2str( T*36525+J2000+8/24-dt_T(T*36525) )+' '+r.toFixed(2)+"千米<br>";   //日期转为字串
  if(i%50==0) s+=s2,s2="";
 }
 Cp8_out.innerHTML=s+s2;
}
function qiCalc(){ //定气测试函数
 var i,T,s="",s2="";
 var y=year2Ayear(Cp8_y.value)-2000;
 var n=Cp8_n.value-0;
 for(i=0;i<n;i++){
  T = XL.S_aLon_t( (y+i*15/360+1)*2*Math.PI );    //精确节气时间计算
  s2+=JD.JD2str( T*36525+J2000+8/24-dt_T(T*36525) )+' '+obb.jqmc[(i+6)%24];  //日期转为字串
  if(i%2==1) s2+='　 视黄经'+(i*15)+'<br>'; else s2+='　'
  if(i%50==0) s+=s2,s2="";
 }
 Cp8_out.innerHTML=s+s2;
}

function houCalc(){ //定候测试函数
 var i, T, s='　　　　　 初候　　　　　　　　　　二候　　　　　　　　　 三候', s2='';
 var y=year2Ayear(Cp8_y.value)-2000;
 var n=Cp8_n.value-0;
 for(i=0;i<n*3;i++){
  T = XL.S_aLon_t( (y+i*5/360+1)*2*Math.PI );    //精确节气时间计算
  if(i%3==0) s2+='<br>　'+obb.jqmc[(i/3+6)%24]+'　'; else s2+='　';
  s2+=JD.JD2str( T*36525+J2000+8/24-dt_T(T*36525) );  //日期转为字串
  if(i%50==0) s+=s2,s2="";
 }
 Cp8_out.innerHTML=s+s2;
}

//==========================
//页面生成有关的函数
//==========================
var pageUrlMap = {
  1:'month', 2:'year', 3:'eclipse', 4:'local-eclipse', 5:'ephemeris',
  6:'phenomena', 7:'stars', 8:'qi-shuo', 9:'rise-set',
  10:'eclipse-overview', 11:'tools', 12:'constants'
};
var pageNameMap = {};
for(var pageUrlKey in pageUrlMap) pageNameMap[pageUrlMap[pageUrlKey]] = pageUrlKey-0;
pageNameMap.planet = 5;
pageNameMap.star = 5;
var activePage = 1;
var urlSyncEnabled = false;
var pageAutoRenderReady = false;
var selectedMonthDay = 0;
var urlStateKeys = 'year,month,day,time,body'.split(',');
function normalizePageParam(value){
  var pg;
  if(!value) return 1;
  if(pageNameMap[value]) return pageNameMap[value];
  pg = value-0;
  if(pg>=1 && pg<=12) return pg;
  return 1;
}
function currentUrlPage(){
  return normalizePageParam(new URLSearchParams(location.search).get('page'));
}
function Ayear2UrlYear(y){
  y-=0;
  if(isNaN(y)) return '';
  return y<=0 ? 'BCE'+(-y+1) : ''+y;
}
function urlYear2Input(value, fallback){
  var s = String(value || '').replace(/\s+/g,'');
  var m;
  if(!s) return fallback;
  m = s.match(/^B(?:CE)?\.?(\d+)$/i);
  if(m) return 'B'+(m[1]-0);
  m = s.match(/^-(\d+)$/);
  if(m) return 'B'+(m[1]-0);
  m = s.match(/^(\d+)$/);
  if(m && (m[1]-0)>0) return ''+(m[1]-0);
  return fallback;
}
function setInputFromParam(id, params, key, normalize){
  var value = params.get(key || id), ob = document.getElementById(id);
  if(value!==null && ob) ob.value = normalize ? normalize(value, ob.value) : value;
}
function setSelectFromParam(id, params, key){
  var value = params.get(key || id), ob = document.getElementById(id);
  if(value!==null && ob && optionIndexByValue(ob, value)>=0) ob.value = value;
}
function applyUrlState(pg){
  var params = new URLSearchParams(location.search);
  if(pg==1){
    setInputFromParam('Cal_y', params, 'year', urlYear2Input);
    setInputFromParam('Cal_m', params, 'month');
    selectedMonthDay = Math.max(0, Math.ceil(params.get('day') || 0));
  }
  if(pg==2) setInputFromParam('Cp2_y', params, 'year', urlYear2Input);
  if(pg==3){
    setInputFromParam('Cb_y', params, 'year', urlYear2Input);
    setInputFromParam('Cb_m', params, 'month');
    setInputFromParam('Cb_d', params, 'day');
    setInputFromParam('Cb_t', params, 'time');
  }
  if(pg==5){
    setSelectFromParam('Cd_xt', params, 'body');
    setInputFromParam('Cd_y', params, 'year', urlYear2Input);
    setInputFromParam('Cd_m', params, 'month');
    setInputFromParam('Cd_d', params, 'day');
    setInputFromParam('Cd_t', params, 'time');
  }
}
function writePageStateParams(params, pg){
  var i;
  for(i=0;i<urlStateKeys.length;i++) params.delete(urlStateKeys[i]);
  if(Sel2 && Sel2.options && Sel2.options.length) params.set('airport', Sel2.options[Sel2.selectedIndex].value);
  if(pg==1){
    params.set('year', Ayear2UrlYear(year2Ayear(Cal_y.value)));
    params.set('month', Cal_m.value);
    if(selectedMonthDay) params.set('day', selectedMonthDay);
  }
  if(pg==2) params.set('year', Ayear2UrlYear(year2Ayear(Cp2_y.value)));
  if(pg==3){
    params.set('year', Ayear2UrlYear(year2Ayear(Cb_y.value)));
    params.set('month', Cb_m.value);
    params.set('day', Cb_d.value);
    params.set('time', Cb_t.value);
  }
  if(pg==5){
    params.set('body', Cd_xt.value);
    params.set('year', Ayear2UrlYear(year2Ayear(Cd_y.value)));
    params.set('month', Cd_m.value);
    params.set('day', Cd_d.value);
    params.set('time', Cd_t.value);
  }
}
function syncPageUrl(pg, replace){
  if(!history || !history[replace?'replaceState':'pushState']) return;
  var params = new URLSearchParams(location.search);
  params.set('page', pageUrlMap[pg] || 'month');
  writePageStateParams(params, pg);
  var nextUrl = location.pathname + '?' + params.toString() + location.hash;
  if(nextUrl == location.pathname + location.search + location.hash) return;
  history[replace?'replaceState':'pushState']({page: pg}, '', nextUrl);
}
function syncActivePageUrl(replace){
  if(urlSyncEnabled) syncPageUrl(activePage, replace);
}
function updateTopNavActive(pg){
  var tabs = document.querySelectorAll('.top-nav .nav-tab[data-page]'), menuLinks, i, page;
  for(i=0;i<tabs.length;i++){
    page = normalizePageParam(tabs[i].getAttribute('data-page'));
    if(page==pg) tabs[i].classList.add('is-active');
    else tabs[i].classList.remove('is-active');
  }
  menuLinks = document.querySelectorAll('#tools a[data-page]');
  for(i=0;i<menuLinks.length;i++){
    page = normalizePageParam(menuLinks[i].getAttribute('data-page'));
    if(page==pg) menuLinks[i].classList.add('is-active');
    else menuLinks[i].classList.remove('is-active');
  }
}
function safePageRender(fn){
  try{ fn(); }
  catch(e){ if(window.console) console.error(e); }
}
function renderPageOnFirstShow(pg){
  if(pg==4 && !Cc_tb.value) safePageRender(function(){ dfRS(0); });
  if(pg==5 && !Cd_tab.value) safePageRender(function(){ pCalc(); });
  if(pg==10 && !Cp10_b1.innerHTML) safePageRender(function(){ tuGL_search(0); });
}
function showPage(pg, skipUrl){
  pg = normalizePageParam(pg);
  activePage = pg;
  updateTopNavActive(pg);
  if(!skipUrl) syncPageUrl(pg, false);
  showHelp(0); //关闭可能已打开的帮助页面
  Cal_pause.checked=true;
  page1.style.display='none';
  page2.style.display='none';
  page3.style.display='none';
  page4.style.display='none';
  page5.style.display='none';
  page6.style.display='none';
  page7.style.display='none';
  page8.style.display='none';
  page9.style.display='none';
  page10.style.display='none';
  page11.style.display='none';
  page12.style.display='none';
  if(pg==1) page1.style.display='';
  if(pg==2){page2.style.display='block'; safePageRender(function(){ getNianLi(0); });} //年历
  if(pg==3){page3.style.display='block'; safePageRender(function(){ tu_calc(2); });} //图表
  if(pg==4) page4.style.display='block'; //地方日食
  if(pg==5) page5.style.display='block'; //行星星历
  if(pg==6) page6.style.display='block'; //行星天象
  if(pg==7) page7.style.display='block'; //恒星星历
  if(pg==8) page8.style.display='block'; //气朔表
  if(pg==9) page9.style.display='block'; //升降表
  if(pg==10) page10.style.display='block'; //食概
  if(pg==11) page11.style.display='block'; //工具
  if(pg==12) page12.style.display='block'; //常数表
  if(pageAutoRenderReady) renderPageOnFirstShow(pg);
}

function tools(){
  var el=document.all.tools, ob=el.style;
  var shell=document.querySelector('.top-shell');
  if(getComputedStyle(el).display=="none"){
    ob.display="block";
    if(shell) shell.classList.add('is-menu-open');
  } else {
    ob.display="none";
    if(shell) shell.classList.remove('is-menu-open');
  }
}

function closeTools(){
  var el=document.all.tools, shell=document.querySelector('.top-shell');
  if(!el) return;
  el.style.display="none";
  if(shell) shell.classList.remove('is-menu-open');
}

function showPageFromMenu(pg){
  showPage(pg);
  closeTools();
}

function readme(){
  var el=document.all.help;
  if(getComputedStyle(el).display=="none") showHelp(1);
  else showHelp(0);
}

function bindEnterAction(ids, action){
  var i, ob;
  for(i=0;i<ids.length;i++){
    ob = document.getElementById(ids[i]);
    if(!ob) continue;
    ob.addEventListener('keydown', function(e){
      if(e.key!='Enter' || e.isComposing) return;
      e.preventDefault();
      action();
    });
  }
}

function initEnterKeyActions(){
  bindEnterAction(['Cal_y','Cal_m'], function(){ getLunar(); });
  bindEnterAction(['Cp2_y','Cp2_n'], function(){ getNianLi(0); });
  bindEnterAction(['Cb_y','Cb_m','Cb_d','Cb_t'], function(){
    Cal_rt.checked=false;
    Cal_pause.checked=true;
    setTimeout(function(){ window.setTimeout('tu_calc(2)',0); },200);
  });
  bindEnterAction(['Cc_y','Cc_m','Cc_d'], function(){ dfRS(0); });
  bindEnterAction(['Cd_y','Cd_m','Cd_d','Cd_t','Cd_dt','Cd_n'], function(){ pCalc(); });
  bindEnterAction(['Cf_y','Cf_m','Cf_d','Cf_t','Cf_dt','Cf_n'], function(){ aCalc(); });
  bindEnterAction(['Cp9_y','Cp9_m','Cp9_d'], function(){ shengjiang(); });
  bindEnterAction(['Cp10_y','Cp10_m','Cp10_an'], function(){ tuGL_search(0); });
  bindEnterAction(['Cml_y','Cml_m','Cml_d','Cml_his'], function(){ ML_calc(); });
  bindEnterAction(['GJ1_y','GJ1_m','GJ1_d','GJ1_t'], function(){ GJ1_calc2(0); });
  bindEnterAction(['GJ1_y2','GJ1_m2','GJ1_d2','GJ1_t2'], function(){ GJ1_calc2(3); });
}

/********************
当前时间初始化,在屏幕上显示时间、保存地方时区信息等
*********************/
function set_date_screen(fw){ //把当前时间置于屏幕的便入框之中
 var now=new Date();
 curTZ = now.getTimezoneOffset()/60; //时区 -8为北京时
 curJD = now/86400000-10957.5 - curTZ/24; //J2000起算的儒略日数(当前地方时间)
 JD.setFromJD(curJD+J2000);

 if(!fw||fw==1){
  Cml_y.value = Ayear2year(JD.Y);
  Cml_m.value = JD.M;
  Cml_d.value = JD.D;
  Cml_his.value = JD.h+':'+JD.m+':'+JD.s.toFixed(0);
 }

 if(!fw||fw==2){
  Cal_y.value = Ayear2year(JD.Y);
  Cal_m.value = JD.M;
 }
 curJD=int2(curJD+0.5);
}
function setInputValue(id,value){
 var ob=document.getElementById(id);
 if(ob)ob.value=value;
}
function setDefaultDateInputsToToday(){
 var now=new Date(),y=Ayear2year(now.getFullYear()),m=now.getMonth()+1,d=now.getDate();
 var dates=[
  ['Cb_y','Cb_m','Cb_d'],['Cc_y','Cc_m','Cc_d'],['Cd_y','Cd_m','Cd_d'],
  ['Ce_y','Ce_m','Ce_d'],['Cf_y','Cf_m','Cf_d'],['Cp9_y','Cp9_m','Cp9_d'],
  ['Cml_y','Cml_m','Cml_d'],['GJ1_y','GJ1_m','GJ1_d'],['GJ1_y2','GJ1_m2','GJ1_d2']
 ];
 var yearMonths=[['Cal_y','Cal_m'],['Cp10_y','Cp10_m']];
 var years=['Cp2_y','Cp8_y','year'];
 var i;
 for(i=0;i<dates.length;i++){
  setInputValue(dates[i][0],y);
  setInputValue(dates[i][1],m);
  setInputValue(dates[i][2],d);
 }
 for(i=0;i<yearMonths.length;i++){
  setInputValue(yearMonths[i][0],y);
  setInputValue(yearMonths[i][1],m);
 }
 for(i=0;i<years.length;i++)setInputValue(years[i],y);
}
set_date_screen(0);
setDefaultDateInputsToToday();
normalizeYearInputs();
initEnterKeyActions();

/****************
外地时间选择
****************/
var majorTimeZones=[
 'Africa/Cairo','Africa/Casablanca','Africa/Johannesburg','Africa/Lagos','Africa/Nairobi',
 'America/Anchorage','America/Argentina/Buenos_Aires','America/Bogota','America/Chicago','America/Denver',
 'America/Halifax','America/Honolulu','America/Los_Angeles','America/Mexico_City','America/New_York',
 'America/Phoenix','America/Santiago','America/Sao_Paulo','America/St_Johns','America/Toronto',
 'America/Vancouver',
 'Asia/Bangkok','Asia/Dubai','Asia/Ho_Chi_Minh','Asia/Hong_Kong','Asia/Jakarta','Asia/Jerusalem',
 'Asia/Karachi','Asia/Kathmandu','Asia/Kolkata','Asia/Kuala_Lumpur','Asia/Manila','Asia/Seoul',
 'Asia/Shanghai','Asia/Singapore','Asia/Taipei','Asia/Tokyo',
 'Atlantic/Azores','Atlantic/Reykjavik',
 'Australia/Adelaide','Australia/Brisbane','Australia/Darwin','Australia/Melbourne','Australia/Perth',
 'Australia/Sydney',
 'Europe/Amsterdam','Europe/Athens','Europe/Berlin','Europe/Istanbul','Europe/Lisbon','Europe/London',
 'Europe/Madrid','Europe/Moscow','Europe/Paris','Europe/Rome','Europe/Stockholm','Europe/Zurich',
 'Pacific/Auckland','Pacific/Chatham','Pacific/Fiji','Pacific/Guam','Pacific/Honolulu','Pacific/Port_Moresby',
 'Pacific/Tahiti'
];
var majorTimeZoneGroups={};

function timeZoneRegion(timeZone){
  return String(timeZone).split('/')[0];
}
function timeZoneDisplayName(timeZone){
  return String(timeZone).replace(/^[^/]+\//,'').replace(/_/g,' ');
}
function getSelectedForeignTimeZone(){
  if(!Sel_dq.options.length) return 'Asia/Shanghai';
  return Sel_dq.options[Sel_dq.selectedIndex].value || 'Asia/Shanghai';
}
function change_dq(){ //时区改变
  Sel_dq.timeZone = getSelectedForeignTimeZone();
  Sel_sqsm.innerHTML = '';
  storageL.setItem('ForeignTimeZone', Sel_dq.timeZone, 1000);
}

function change_zhou(){ //IANA 区域改变
  var i, region = Sel_zhou.options[Sel_zhou.selectedIndex].value;
  var selected = Sel_dq.timeZone || storageL.getItem('ForeignTimeZone') || 'Asia/Shanghai';
  var list = majorTimeZoneGroups[region] || [];
  Sel_dq.length=0;
  for(i=0; i<list.length; i++) addOp(Sel_dq, list[i], timeZoneDisplayName(list[i]));
  for(i=0; i<Sel_dq.options.length; i++){
    if(Sel_dq.options[i].value==selected){
      Sel_dq.selectedIndex=i;
      break;
    }
  }
  change_dq();
}

function initForeignTimeZones(){
  var i, region, regions=[], saved = storageL.getItem('ForeignTimeZone') || 'Asia/Shanghai';
  majorTimeZones.sort();
  for(i=0;i<majorTimeZones.length;i++){
    region = timeZoneRegion(majorTimeZones[i]);
    if(!majorTimeZoneGroups[region]){
      majorTimeZoneGroups[region]=[];
      regions.push(region);
    }
    majorTimeZoneGroups[region].push(majorTimeZones[i]);
  }
  Sel_zhou.length=0;
  for(i=0;i<regions.length;i++) addOp(Sel_zhou, regions[i], regions[i]);
  region = timeZoneRegion(saved);
  for(i=0;i<Sel_zhou.options.length;i++){
    if(Sel_zhou.options[i].value==region){
      Sel_zhou.selectedIndex=i;
      break;
    }
  }
  change_zhou();
}
initForeignTimeZones();

function show_clock(t){ //显示时钟,传入日期对象
  Clock1.innerHTML = airportLocalTimeString(t);
  Clock2.innerHTML = foreignTimeString(t, getSelectedForeignTimeZone());
}

function foreignTimeString(t,timeZone){
  try{
    var parts = new Intl.DateTimeFormat('zh-CN-u-ca-gregory', {
      timeZone: timeZone,
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(t);
    var ob = {}, i;
    for(i=0;i<parts.length;i++) if(parts[i].type!='literal') ob[parts[i].type]=parts[i].value;
    return ob.day+'日 '+ob.hour+':'+ob.minute+':'+ob.second;
  }catch(e){
    return t.toLocaleString2();
  }
}

function airportLocalTimeString(t){
  var timeZone = Sel2.timeZone;
  if(!timeZone) return t.toLocaleString2();
  try{
    var parts = new Intl.DateTimeFormat('zh-CN-u-ca-gregory', {
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(t);
    var ob = {}, i;
    for(i=0;i<parts.length;i++) if(parts[i].type!='literal') ob[parts[i].type]=parts[i].value;
    return ob.year+'年'+ob.month+'月'+ob.day+'日 '+ob.hour+':'+ob.minute+':'+ob.second;
  }catch(e){
    return t.toLocaleString2();
  }
}
function utcDateWithFullYear(y,m,d,h,mi,s){
  var date = new Date(Date.UTC(2000, 0, 1, h||12, mi||0, s||0));
  date.setUTCFullYear(y, m-1, d);
  date.setUTCHours(h||12, mi||0, s||0, 0);
  return date;
}
function airportTimezoneOffsetHours(y,m,d){
  var timeZone = Sel2.timeZone;
  if(!timeZone || !window.Intl) return curTZ;
  try{
    var date = utcDateWithFullYear(y, m, d, 12);
    var parts = new Intl.DateTimeFormat('en-US-u-ca-gregory', {
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(date);
    var ob = {}, i;
    for(i=0;i<parts.length;i++) if(parts[i].type!='literal') ob[parts[i].type]=parts[i].value;
    var localAsUtc = utcDateWithFullYear(ob.year-0, ob.month-0, ob.day-0, ob.hour-0, ob.minute-0, ob.second-0).getTime();
    return -(localAsUtc - date.getTime()) / 3600000;
  }catch(e){
    return curTZ;
  }
}

/****************
地理经纬度选择的页面控制函数
****************/
function change2(){
  if(!Sel2.options.length) return;
  var code = Sel2.options[Sel2.selectedIndex].value;
  var airport = airportMap[code];
  if(!airport) return;
  var v = { J: airport.lon/180*Math.PI, W: airport.lat/180*Math.PI };
  Sel2.vJ = v.J; Sel2.vW = v.W;
  Sel2.timeZone = airport.timeZone || '';
  Cb_J.value=(airport.lon-0).toFixed(6), Cb_W.value=(airport.lat-0).toFixed(6);
  Cf_J.value = Cd_J.value = Cp9_J.value = Cb_J.value;
  Cf_W.value = Cd_W.value = Cp9_W.value = Cb_W.value;
  Cp11_J.value = Cb_J.value
  Cal_zdzb.innerHTML = '经度 '+rad2str2(v.J) + ' 纬度 '+rad2str2(v.W) + (airport.timeZone ? ' 时区 '+airport.timeZone : '');
  showMessD(-2);
  storageL.setItem('AirportCountryIndexV3',Sel1.selectedIndex,1000);
  storageL.setItem('AirportCodeV3',code,1000);
  syncActivePageUrl(true);
}
function change(){
  if(!Sel1.options.length) return;
  Sel2.length=0; 
  var i, country=airportCountries[ Sel1.options[Sel1.selectedIndex].value-0 ];
  var list = airportGroups[country] || [];
  for(i=0; i<list.length; i++) addOp( Sel2, list[i].code, airportLabel(list[i]) );
  change2();
}
function airportLabel(ob){
  var city = ob.city || ob.country || '';
  var name = ob.name || '';
  return ob.code + (city ? ' ' + city : '') + (name ? ' · ' + name : '');
}
function airportSort(a,b){
  var ac = (a.city || '').toLowerCase(), bc = (b.city || '').toLowerCase();
  if(ac<bc) return -1; if(ac>bc) return 1;
  return a.code<b.code ? -1 : (a.code>b.code ? 1 : 0);
}
function airportCountrySort(a,b){
  var priority = {'United States':0, 'Canada':1, 'China':2};
  var pa = priority.hasOwnProperty(a) ? priority[a] : 99;
  var pb = priority.hasOwnProperty(b) ? priority[b] : 99;
  if(pa!==pb) return pa-pb;
  if(a<b) return -1; if(a>b) return 1;
  return 0;
}
function initAirportSelectors(){
  var source = window.AIRPORTS || {};
  airportMap = {};
  airportCountries = [];
  airportGroups = {};
  var codes = [], code, airport, country, i;
  for(code in source) if(source.hasOwnProperty(code)) codes.push(code);
  codes.sort();
  for(i=0; i<codes.length; i++){
    code = codes[i];
    airport = source[code];
    if(!airport || isNaN(airport.lat) || isNaN(airport.lon)) continue;
    country = airport.country || 'Unknown';
    airportMap[code] = {
      code: code,
      name: airport.name || code,
      city: airport.city || '',
      country: country,
      lat: airport.lat-0,
      lon: airport.lon-0,
      timeZone: airportTimeZone(airport.lat-0, airport.lon-0)
    };
    if(!airportGroups[country]){
      airportGroups[country] = [];
      airportCountries.push(country);
    }
    airportGroups[country].push(airportMap[code]);
  }
  airportCountries.sort(airportCountrySort);
  for(i=0; i<airportCountries.length; i++) airportGroups[airportCountries[i]].sort(airportSort);
}
function airportTimeZone(lat, lon){
  if(typeof tzlookup!='function') return '';
  try{ return tzlookup(lat, lon); }
  catch(e){ return ''; }
}
function selectedIndexOrFallback(savedIndex, count, fallback){
  if(savedIndex===null || savedIndex===undefined || savedIndex==='') return fallback;
  savedIndex -= 0;
  if(isNaN(savedIndex) || savedIndex<0 || savedIndex>=count) return fallback;
  return savedIndex;
}
function optionIndexByValue(selectObj, value){
  var i;
  for(i=0; i<selectObj.options.length; i++) if(selectObj.options[i].value==value) return i;
  return -1;
}
var airportMap = {}, airportCountries = [], airportGroups = {};
var i;
initAirportSelectors();
for(i=0;i<airportCountries.length;i++) addOp(document.all.Sel1,i,airportCountries[i]);
var urlAirport = (new URLSearchParams(location.search).get('airport') || 'SEA').toUpperCase();
if(!airportMap[urlAirport]) urlAirport = 'SEA';
var defaultCountry = airportCountries.indexOf(airportMap[urlAirport] ? airportMap[urlAirport].country : 'United States');
if(defaultCountry<0) defaultCountry = 0;
Sel1.selectedIndex = defaultCountry; change();
var defaultAirport = optionIndexByValue(Sel2, urlAirport);
if(defaultAirport<0) defaultAirport = 0;
Sel2.selectedIndex = defaultAirport; change2();

var initialPage = currentUrlPage();
applyUrlState(initialPage);
getLunar(); //调用月历页面生成函数
showPage(initialPage, true);
syncPageUrl(initialPage, true);
pageAutoRenderReady = true;
renderPageOnFirstShow(activePage);
urlSyncEnabled = true;
window.addEventListener('popstate', function(){
  var pg = currentUrlPage(), old = urlSyncEnabled;
  urlSyncEnabled = false;
  applyUrlState(pg);
  if(pg==1) getLunar();
  showPage(pg, true);
  urlSyncEnabled = old;
});

/**********************
命理八字计算
**********************/
function ML_calc(){
 var ob=new Object();
 var t = timeStr2hour(Cml_his.value);
 var jd=JD.JD(year2Ayear(Cml_y.value), Cml_m.value-0, Cml_d.value-0+t/24)
 obb.mingLiBaZi( jd+curTZ/24-J2000, Cp11_J.value/radd, ob ); //八字计算
 Cal6.innerHTML =
     '<font color=red><b>[日标]：</b></font>'+'公元 '+Cml_y.value+'-'+Cml_m.value+'-'+Cml_d.value + ' 儒略日数 ' + int2(jd+0.5) + ' 距2000年首' + int2(jd+0.5-J2000) + '日<br>'
   + '<font color=red><b>[八字]：</b></font><font color=blue><b>'    + ob.bz_jn+'</b></font>年 <font color=blue><b>'+ob.bz_jy+'</b></font>月 <font color=blue><b>'+ob.bz_jr+'</b></font>日 <font color=blue><b>'+ob.bz_js+'</b></font>时　真太阳时 <font color=red>' + ob.bz_zty+ '</font><br>'
   + '<font color=green><b>[纪时]：</b></font>' + ob.bz_JS + '<br>'
   + '<font color=green><b>[时标]：</b></font>' + '　　①　　③　　⑤　　⑦　　⑨　　⑪　　⑬　　⑮　　⑰　　⑲　　㉑　　㉓';
}
//ML_calc(); //在时间、地标初始化完成后就可执行

function ML_settime(){ set_date_screen(1); ML_calc(); }

/**********************
月历的年、月跳转控制函数
**********************/

function changeYear(ud){ //跳到上(或下)一年
 var y = year2Ayear(Cal_y.value);
 if(y==-10000) return;
 if(ud==0){
   if(y<=-9999) { alert('超出计算范围！'); return; }
   Cal_y.value = Ayear2year(y-1);
 }else{
   if(y>=9999) { alert('超出计算范围！'); return; }
   Cal_y.value = Ayear2year(y+1);
 }
 getLunar();
}
function changeMonth(ud){ //跳到上(或下)下月
 var y,m;
 y = year2Ayear(Cal_y.value);
 m = Cal_m.value-0;
 if(ud==0){
   if(m<=1 && y<=-9999) { alert('超出计算范围！'); return; }
   if(m<=1) Cal_m.value = 12, Cal_y.value = Ayear2year(y-1);
   else{if(m>12) Cal_m.value = 12;else Cal_m.value = m-1;}
 }
 if(ud==1){
   if(m>=12 && y>=9999) { alert('超出计算范围！'); return; }
   if(m>=12) Cal_m.value = 1, Cal_y.value = Ayear2year(y+1);
   else{if(m<1) Cal_m.value = 1;else Cal_m.value = m+1;}
 }
 if(ud==2) set_date_screen(2);
 getLunar();
}

/********************
升降计算等
*********************/

function RTS1(jd,vJ,vW,tz){
 SZJ.calcRTS(jd, 1, vJ, vW, tz); //升降计算,使用北时时间,tz=-8指东8区,jd+tz应在当地正午左右(误差数小时不要紧)
 var s, ob = SZJ.rts[0];
// JD.setFromJD(jd+J2000);
 s  = '日出 <font color=red>'+ob.s + '</font>　月出 '+ob.Ms+'<br>';
 s += '日中 '+ob.z+'　月中 '+ob.Mz+'<br>';
 s += '日落 '+ob.j+'　月落 '+ob.Mj+'<br>';
 s += '<a title="天亮">晨光 '+ob.c + '</a>　<a title="天黑">昏影 '+ob.h +'</a><br>';
 s += '日照 '+ob.sj+ '　昼长 '+ob.ch+'<br>';
 return s;
}

/**********************
日历(某日)信息页面生成
**********************/
function dayMessHTML(ob){
 var s  = '公元'+Ayear2year(ob.y).replace(/[B]/g, "前") + '年' + ob.m + '月' + ob.d + '日';
 s += '<br>阳历'+ob.Lyear2+'年 周' + JD.Weeks[ob.week] + ' ' + ob.XiZ;
 s += '<br>'+ob.Lyear4+'年 '+ob.Lleap + ob.Lmc + '月' + (ob.Ldn>29?'大 ':'小 ') + ob.Ldc + '日';
 s += '<br>开元'+ob.Lyear3+'年'+ob.Lmonth2+'月'+ob.Lday2+'日';
 s += '<br>回历['+ob.Hyear+'年'+ob.Hmonth+'月'+ob.Hday+'日]';
 s += '<br>JD '+(ob.d0+J2000)+'('+ob.d0+') ';
 if(ob.jqmc) s += '<br>定'+ob.jqmc.slice(-2)+' '+ob.jqsj;
 if(ob.A+ob.B+ob.C) s += '<br>';
 if(ob.A)    s += ob.A +' ';
 if(ob.B)    s += ob.B.replace(/[⚆⊙]/g, "") +' ';
 if(ob.C)    s += ob.C;
 return s;
}

function showMessD(n, skipUrl){ //显时本月第n日的摘要信息。调用前应先执月历页面生成，产生有效的lun对象
 if(!lun.dn||n>=lun.dn) return;
 var vJ = Sel2.vJ-0, vW = Sel2.vW-0;
 if(n==-1) return;
 if(n==-2){
   n = 0;
   for(var i=0;i<lun.dn;i++) if(lun.lun[i].d0==curJD){n=i;break;}
 }
 if(n<0) return;
 //显示n指定的日期信息
 var ob = lun.lun[n];
 selectedMonthDay = ob.d;
 Cal5.innerHTML = RTS1(ob.d0, vJ, vW, airportTimezoneOffsetHours(ob.y, ob.m, ob.d));
 Cal_day.innerHTML = dayMessHTML(ob);
 refreshChineseMode(Cal5);
 refreshChineseMode(Cal_day);
 if(Cal_pan) Cal_pan.style.display = 'none';
 for(var j=0;j<lun.dn;j++){
   var td=document.getElementById('Cal_day_'+j);
   if(td) td.className = td.className.replace(/\bis-selected\b/g,'').replace(/\s+/g,' ').replace(/^\s|\s$/g,'');
 }
 var cur=document.getElementById('Cal_day_'+n);
 if(cur && cur.className.indexOf('is-selected')<0) cur.className += ' is-selected';
 if(activePage==1 && !skipUrl) syncActivePageUrl(false);
}

/**********************
月历页面生成
**********************/
function getLunar(){ //月历页面生成

  var By  = year2Ayear(Cal_y.value);
  var Bm  = Math.ceil(Cal_m.value);Cal_m.value=Bm;
  if(By == -10000) return;
  if(Bm<1||Bm>12) { alert('“月份”请输入 1~12 的整数'); return; } //检查输入值

  if(!lun.dn || lun.y!=By || lun.m!=Bm){  //月历未计算
   lun.yueLiHTML(By,Bm,curJD);
   Cal2.innerHTML = lun.pg1;
   Cal4.innerHTML = lun.pg2;
   refreshChineseMode(Cal2);
   refreshChineseMode(Cal4);
  }

  if(selectedMonthDay>0 && selectedMonthDay<=lun.dn) showMessD(selectedMonthDay-1, true);
  else showMessD(-2, true);
  if(activePage==1) syncActivePageUrl(false);
}

/**********************
年历面页生成
**********************/
function getNianLi(dy){ //dy起始年份偏移数
 var now=new Date();
 if(dy==2){Cp2_y.value=Ayear2year(now.getFullYear());dy=0;}
 y=year2Ayear(Cp2_y.value);
 if(y==-10000) return; //检查输入值
 y+=dy;
 Cp2_y.value = Ayear2year(y); //加上偏移年数
 if(y<-10000) { alert('超出计算范围'); return; } //检查输入值
 if(Cp2_tg.checked) Cal7.innerHTML = '<br>　<b>'+Ayear2year(y)+'年</b><br>'+nianLiHTML(y,'')+'<br>';
 else               Cal7.innerHTML = '<br>　<b>'+Ayear2year(y)+'年</b><br>'+nianLi2HTML(y)+'<br>';
 refreshChineseMode(Cal7);
 if(activePage==2) syncActivePageUrl(false);
}
function getNianLiN(){ //dy起始年份偏移数
 y=year2Ayear(Cp2_y.value);
 if(y==-10000) return; //检查输入值
 n=Cp2_n.value-0;
 if(n<1||n>500) {alert("超出计算范围"); return;}
 var i,s='';
 for(i=0;i<n;i++){
  if(Cp2_tg.checked) s += '<br>　<b>'+Ayear2year(y+i)+'年</b><br>'+nianLiHTML(y+i,'');
  else               s += '<br>　<b>'+Ayear2year(y+i)+'年</b><br>'+nianLi2HTML(y+i);
 }
 Cal7.innerHTML = s+'<br>';
 refreshChineseMode(Cal7);
 if(activePage==2) syncActivePageUrl(false);
}

/**********************
时钟1秒定时
**********************/
function tick() { //即时坐标计算
  var now = new Date();
  try{ show_clock(now); }catch(e){}
  try{ zb_calc(); }catch(e){}
  window.setTimeout(tick, 1000);
}
tick(); //触发时钟

function K_getJD(){
 JD.Y = Iy.value-0;
 JD.M = Im.value-0;
 JD.D = Id.value-0;
 JD.h = Ih.value-0;
 JD.m = Ii.value-0;
 JD.s = Is.value-0;
 return JD.toJD();
}

function testDD(UT){ //坐标测试
 var s="",T,T2,dt;
 T=(K_getJD()-J2000);  //力学时
 if(UT){
   T += dt_T(T)-8/24;
 }

 z=new Array(),z2=new Array(); //坐标数组

 msc.calc(T,I_dlLon.value/180*Math.PI,I_dlLat.value/180*Math.PI,0); //坐标测试
 s += msc.toHTML(1);

 //月球迭代算法测试
 L =XL.M_Lon(T/36525,-1); //正算
 T2=XL.M_Lon_t(L)*36525;  //反算
 dt=(T2-T)*86400;
 s += "<b>月球迭代算法测试:</b><br>";
 s += "高速迭代法求指定Date平分点黄经的发生时刻。测试如下：<br>";
 s += "输入时间(日数):" + T + "<br>";
 s += "月球黄经(弧度):" + L + "<br>";
 s += "反算时间(日数):" + T2 + "<br>";
 s += "迭代误差(秒):" +dt +"<br><br>";

 //地球迭代算法测试
 L=XL.E_Lon(T/36525,-1);
 T2=XL.E_Lon_t(L)*36525;
 dt=(T2-T)*86400;
 s += "<b>地球迭代算法测试:</b><br>";
 s += "输入时间(日数):"+T+"<br>";
 s += "地球黄经(弧度):"+L+"<br>";
 s += "反算时间(日数):"+T2+"<br>";
 s += "迭代误差(秒):"+dt+"<br><br>";

 L=XL.MS_aLon(T/36525,-1,60); //-1表示月球序列全部计算,60表示地球序列只算60项就可以了
 T2=XL.MS_aLon_t(L)*36525;
 dt=(T2-T)*86400;
 s += "月日黄经差返算迭代的时间误差(秒):" + dt + "<br><br>";

 out.innerHTML=s;
}

function dingQi_cmp(){ //定气误差测试
 var i,T,maxT=0;
 var y=year.value-2000;
 var N=testN.value-0;
 for(i=0;i<N;i++){
  W = (y+i/24)*2*Math.PI;
  T= XL.S_aLon_t2( W ) - XL.S_aLon_t( W ); //节气粗算与精算的差异
  T = int2( Math.abs(T*36525*86400) );
  if( T>maxT ) maxT=T;
 }
 out.innerHTML = (2000+y)+"年之后"+N+"个节气粗算与精算的最大差异:"+maxT+"秒。";
 out.innerHTML = '<font color=red>' + out.innerHTML + '</font>';
}

function dingSuo_cmp(){ //定朔测试函数
 var i,T,maxT=0;
 var y=year.value-2000;
 var N=testN.value-0;
 var n=int2(y*(365.2422/29.53058886)); //截止当年首经历朔望的个数
 for(i=0;i<N;i++){
  W = (n+i/24)*2*Math.PI;
  T= XL.MS_aLon_t2( W ) - XL.MS_aLon_t( W ); //合塑粗算与精算的差异
  T = int2( Math.abs(T*36525*86400) );
  if( T>maxT ) maxT=T;
 }
 out.innerHTML = (2000+y)+"年之后"+N+"个朔日粗算与精算的最大差异:"+maxT+"秒。";
 out.innerHTML = '<font color=red>' + out.innerHTML + '</font>';
}

function dingQi_v(){ //定气计算速度测试
 var d1=new Date(); for(i=0;i<1000;i++) XL.S_aLon_t(0);
 var d2=new Date(); for(i=0;i<1000;i++) XL.S_aLon_t2(0);
 var d3=new Date();
 out.innerHTML =  "高精度:"+(d2-d1)+"毫秒/千个<br>"
               +  "低精度:"+(d3-d2)+"毫秒/千个<br>";
 out.innerHTML = '<font color=red>' + out.innerHTML + '</font>';
}

function dingSuo_v(){ //定朔计算速度测试
 var d1=new Date(); for(i=0;i<1000;i++) XL.MS_aLon_t(0);
 var d2=new Date(); for(i=0;i<1000;i++) XL.MS_aLon_t2(0);
 var d3=new Date();
 out.innerHTML =  "高精度:"+(d2-d1)+"毫秒/千个<br>"
               +  "低精度:"+(d3-d2)+"毫秒/千个<br>";
 out.innerHTML = '<font color=red>' + out.innerHTML + '</font>';
}

function K_show(f){
 pan_1.style.display='none';
 if(f==1) pan_1.style.display='block';
 out.innerHTML='';
}

function N_uA(){var a=navigator.userAgent;out.innerHTML='&nbsp;'+a;}

/**********************
繁简转换
**********************/
var chineseMode = 'cn';
var openccTextOriginals = new WeakMap();
var openccConverter = null;
var openccObserver = null;
var openccApplying = false;
var openccAttrNames = ['title', 'aria-label', 'placeholder'];
var openccButtonTypes = { button:1, submit:1, reset:1 };
var openccCustomDict = [
  ['本歷', '本曆'],
  ['實歷', '實曆']
];

function applyOpenCCOverrides(value){
  var i, next = String(value);
  for(i=0;i<openccCustomDict.length;i++) next = next.split(openccCustomDict[i][0]).join(openccCustomDict[i][1]);
  return next;
}

function convertOpenCCValue(value, converter){
  var next = converter ? converter(value) : value;
  return converter ? applyOpenCCOverrides(next) : next;
}

function getSavedChineseMode(){
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang');
  if(lang=='tw' || lang=='cn') return lang;
  try{
    lang = storageL.getItem('ChineseModeV1') || localStorage.getItem('ChineseModeV1');
  }catch(e){
    lang = '';
  }
  return lang=='tw' ? 'tw' : 'cn';
}

function setSavedChineseMode(mode){
  try{ storageL.setItem('ChineseModeV1', mode, 1000); }catch(e){}
  try{ localStorage.setItem('ChineseModeV1', mode); }catch(e){}
}

function syncChineseModeUrl(){
  if(!history || !history.replaceState) return;
  var params = new URLSearchParams(location.search);
  if(chineseMode=='tw') params.set('lang', 'tw');
  else params.delete('lang');
  var query = params.toString();
  var nextUrl = location.pathname + (query ? '?' + query : '') + location.hash;
  if(nextUrl != location.pathname + location.search + location.hash) history.replaceState(history.state, '', nextUrl);
}

function isOpenCCExcludedNode(node){
  var el = node.nodeType==1 ? node : node.parentElement;
  while(el){
    if(el.classList && el.classList.contains('ignore-opencc')) return true;
    if(/^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/i.test(el.tagName)) return true;
    el = el.parentElement;
  }
  return false;
}

function getOpenCCConverter(){
  if(openccConverter) return openccConverter;
  if(!window.OpenCC || !OpenCC.ConverterFactory || !OpenCC.Locale) return null;
  openccConverter = OpenCC.ConverterFactory(
    OpenCC.Locale.from.cn,
    OpenCC.Locale.to.tw.concat([openccCustomDict])
  );
  return openccConverter;
}

function convertOpenCCTextNode(node, refreshOriginal){
  if(isOpenCCExcludedNode(node)) return;
  var original = openccTextOriginals.get(node);
  if(original===undefined || refreshOriginal){
    original = node.nodeValue;
    openccTextOriginals.set(node, original);
  }
  var converter = chineseMode=='tw' ? getOpenCCConverter() : null;
  var next = convertOpenCCValue(original, converter);
  if(node.nodeValue !== next) node.nodeValue = next;
}

function openccOriginalAttrs(el){
  if(!el._openccOriginalAttrs) el._openccOriginalAttrs = {};
  return el._openccOriginalAttrs;
}

function convertOpenCCAttr(el, name, refreshOriginal){
  if(!el.hasAttribute || !el.hasAttribute(name)) return;
  var originals = openccOriginalAttrs(el);
  if(originals[name]===undefined || refreshOriginal) originals[name] = el.getAttribute(name);
  var converter = chineseMode=='tw' ? getOpenCCConverter() : null;
  var next = convertOpenCCValue(originals[name], converter);
  if(el.getAttribute(name) !== next) el.setAttribute(name, next);
}

function isOpenCCOwnTextMutation(node){
  var original = openccTextOriginals.get(node), converter;
  if(original===undefined) return false;
  converter = getOpenCCConverter();
  return !!converter && node.nodeValue === convertOpenCCValue(original, converter);
}

function isOpenCCOwnAttrMutation(el, name){
  var originals = el._openccOriginalAttrs, converter;
  if(!originals || originals[name]===undefined || !el.hasAttribute(name)) return false;
  converter = getOpenCCConverter();
  return !!converter && el.getAttribute(name) === convertOpenCCValue(originals[name], converter);
}

function convertOpenCCElementAttrs(el, refreshOriginal){
  var i, type;
  if(isOpenCCExcludedNode(el)) return;
  for(i=0;i<openccAttrNames.length;i++) convertOpenCCAttr(el, openccAttrNames[i], refreshOriginal);
  type = (el.type || '').toLowerCase();
  if(el.tagName=='INPUT' && openccButtonTypes[type]) convertOpenCCAttr(el, 'value', refreshOriginal);
}

function walkOpenCC(root){
  var walker, node;
  if(!root || isOpenCCExcludedNode(root)) return;
  if(root.nodeType==3){
    convertOpenCCTextNode(root, false);
    return;
  }
  if(root.nodeType!=1 && root.nodeType!=9 && root.nodeType!=11) return;
  if(root.nodeType==1) convertOpenCCElementAttrs(root, false);
  walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode:function(node){
      return isOpenCCExcludedNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  while((node = walker.nextNode())){
    if(node.nodeType==3) convertOpenCCTextNode(node, false);
    else convertOpenCCElementAttrs(node, false);
  }
}

function refreshChineseMode(root){
  if(chineseMode!='tw' || !getOpenCCConverter()) return;
  openccApplying = true;
  walkOpenCC(root || document.body);
  if(openccObserver) openccObserver.takeRecords();
  openccApplying = false;
}

function applyChineseMode(){
  var button = document.getElementById('OpenCC_toggle');
  var converterReady = !!getOpenCCConverter();
  document.documentElement.lang = chineseMode=='tw' ? 'zh-Hant' : 'zh-Hans';
  if(button){
    button.value = chineseMode=='tw' ? '简' : '繁';
    button.title = chineseMode=='tw' ? '切換簡體' : '切换繁体';
    button.disabled = !converterReady;
  }
  if(chineseMode=='tw' && !converterReady) return;
  openccApplying = true;
  walkOpenCC(document.body);
  if(openccObserver) openccObserver.takeRecords();
  openccApplying = false;
}

function setChineseMode(mode, updateUrl){
  chineseMode = mode=='tw' ? 'tw' : 'cn';
  setSavedChineseMode(chineseMode);
  if(updateUrl) syncChineseModeUrl();
  applyChineseMode();
}

function toggleChineseMode(){
  setChineseMode(chineseMode=='tw' ? 'cn' : 'tw', true);
}

function initChineseMode(){
  chineseMode = getSavedChineseMode();
  applyChineseMode();
  if(window.MutationObserver){
    openccObserver = new MutationObserver(function(records){
      var i, j, record;
      if(openccApplying || chineseMode!='tw') return;
      openccApplying = true;
      for(i=0;i<records.length;i++){
        record = records[i];
        if(record.type=='childList'){
          for(j=0;j<record.addedNodes.length;j++) walkOpenCC(record.addedNodes[j]);
        }else if(record.type=='characterData'){
          convertOpenCCTextNode(record.target, !isOpenCCOwnTextMutation(record.target));
        }else if(record.type=='attributes'){
          if(isOpenCCOwnAttrMutation(record.target, record.attributeName)) convertOpenCCElementAttrs(record.target, false);
          else convertOpenCCElementAttrs(record.target, true);
        }
      }
      openccObserver.takeRecords();
      openccApplying = false;
    });
    openccObserver.observe(document.body, {
      childList:true,
      subtree:true,
      characterData:true,
      attributes:true,
      attributeFilter:['title', 'aria-label', 'placeholder', 'value']
    });
  }
}

initChineseMode();

document.addEventListener('keydown', function(e){
  if(e.key=='Escape' && document.body.classList.contains('is-help-open')){
    showHelp(0);
  }
});
