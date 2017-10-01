import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Card from './Card/Card';

const data = [{"id":1,"name":"London","values":[10.697214351966977,-14.81792712584138,-34.33752446435392,35.862354445271194,5.403102608397603,-24.10354996100068,-45.39218882564455,-11.032365076243877,31.73256143927574,-1.1593455448746681,-40.31044254079461,-11.433195695281029,-21.821058355271816,44.734533689916134,7.042735419236124,29.477737681008875,-45.63502606470138,37.47399423737079,8.680301485583186,-2.5315538980066776,-25.96329862717539,11.472435481846333,36.504431371577084,-31.0582984238863,-49.52731723897159,1.3670378597453237,48.000635020434856,-20.21952320355922,38.79450305830687,-39.395215502008796,-12.540572346188128,-18.426869250833988,-42.63086535502225,28.744928329251707,-40.84846652112901,-46.32300082594156,-35.87582819163799,9.79812538716942,-19.934345525689423,8.284372230991721,-26.231406489387155,-0.3989695571362972,-9.404944418929517,-16.16678680293262,-24.02208810672164,41.522721643559635,37.53613156732172,38.809475395828485,10.823740810155869,-46.407290967181325]},{"id":2,"name":"Paris","values":[-49.541132408194244,15.904408600181341,46.89182850997895,-43.96986700594425,-13.040912547148764,14.42842846736312,14.845809224061668,-9.639149974100292,39.73809527233243,-18.810060620307922,43.962679198011756,35.184981976635754,0.008296244777739048,46.486844890750945,38.78917444963008,45.15757055487484,46.26291734166443,-40.51643011625856,26.835411926731467,-37.48652946669608,18.92643547616899,-41.70730882324278,15.542874182574451,-43.38988407980651,20.593468751758337,11.608448228798807,-49.44652251433581,37.124076881445944,-48.264087247662246,33.91279799398035,8.434254443272948,28.123922273516655,-1.8538449658080935,-38.13344214577228,48.05007595568895,48.00071767531335,-41.61914826836437,15.753784542903304,-27.87856520153582,43.22015582583845,35.562192485667765,48.58278923202306,-44.52005901839584]},{"id":3,"name":"Moscow","values":[32.72703536786139,11.78596350364387,13.670079526491463,-22.247687657363713,29.777221637777984,6.751218484714627,43.74679606407881,-11.36837329249829,10.53772324230522,-30.47793246805668,-38.21658028755337,30.300792888738215,10.07481818087399,-35.51903543993831,-25.298147252760828,-11.038770363666117,2.4300103541463614,45.326767419464886,-49.45854365359992,-14.91642827168107,-10.173552832566202,39.46527566295117,-10.904383729211986,-12.146847322583199,-19.87981393467635,7.925258646719158,27.22088061273098,-47.81981282867491,-40.75283221900463,-28.203210746869445,-18.439113930799067,-4.122257931157947,13.298435253091156,27.02161220367998,-31.42398374620825,13.713073800317943]},{"id":4,"name":"Berlin","values":[5.106157064437866,1.163347763940692,-8.850015443749726,36.3323372323066,47.327091405168176,49.655218375846744,-37.78824442997575,-41.658269125036895,43.814083258621395,43.4346076566726,-27.134612761437893,9.191697975620627,30.863365484401584,27.544250013306737,-49.217704171314836,15.830948087386787,-25.9073844878003,-14.48489404283464,-23.038499453105032,-24.02035801205784,0.6104435073211789,-14.922396815381944,-17.77664904948324,-25.23290771059692,27.227010717615485,8.691662177443504,-31.22952056583017,-44.73507774528116,41.43219389952719,-29.94585281703621,25.092621380463243,47.95067342929542,-44.846441014669836,29.74004780407995,-32.093425234779716,47.12723318953067,-26.322766463272274,-42.78615030925721,13.409596681594849,-40.003337152302265]},{"id":5,"name":"Nis","values":[]}];

class App extends Component {
  //todo: get data :)
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
        <div className="cards">
            { 
              data.map((city, i) => {
                const { name, values } = city;
                const currentTemp = values[values.length - 1];
                const averageTemp = values.reduce((sum, value) => sum + value, 0) / values.length;

                return <Card
                  key={i}
                  average={averageTemp}
                  name={name}
                  temperature={currentTemp}
                />
              }) 
            }
        </div>
      </div>
    );
  }
}

export default App;