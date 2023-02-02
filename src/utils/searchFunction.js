
export const filterProducts = ({ opDesc, opAsce, opAZ, opZA, opSinOrden, search,generos,keyF,bpmMin,bpmMax}, lista) => {
    
    let nuevaLista = lista.slice();

    if (search != "undefined"){
      console.log(search)
        nuevaLista = nuevaLista.filter((ele) =>
        {
         return ele.nombre.toLowerCase().includes(search.toLowerCase())|| ele.autor.toLowerCase().includes(search.toLowerCase())||ele.descripcion.toLowerCase().includes(search.toLowerCase())
        }
        );
    }
    if(generos.length){
        nuevaLista = nuevaLista.filter((x) => {
            return generos.every((p) => {
              return x.generos?.includes(p);
            });
          });
    }
    if(keyF){
        if(keyF==="All"){
            
        }else if(keyF){
            nuevaLista = nuevaLista.filter((z)=>{
                return z.key.includes(keyF)
            })
        }
    }
    if(bpmMin){
      nuevaLista = nuevaLista.filter((x) => {
        return x.tiempo >= parseInt(bpmMin)
      });
    }
     if(bpmMax){
      console.log(bpmMax)
      
      nuevaLista = nuevaLista.filter((x) => {
        return x.tiempo < parseInt(bpmMin)
      });
    }

     if (opDesc) {
      nuevaLista.sort((a, b) => a.ataque - b.ataque);
    } else if (opAsce) {
      nuevaLista.sort((a, b) => b.ataque - a.ataque);
    } else if (opAZ) {
      nuevaLista.sort((a, b) => {
        if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
          return -1;
        }
        if (b.nombre.toLowerCase() < a.nombre.toLowerCase()) {
          return 1;
        }
        return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
      });
    } else if (opZA) {
      nuevaLista.sort((a, b) => {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
          return -1;
        }
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
          return 1;
        }
        return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
      });
    }
    if (opSinOrden) {
      return nuevaLista;
    }
    console.log(nuevaLista)
    return nuevaLista;
  };