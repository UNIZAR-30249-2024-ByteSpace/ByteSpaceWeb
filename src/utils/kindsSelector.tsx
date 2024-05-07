import { Kind } from '../core/space/domain';
import Despacho from '/src/assets/despacho.svg';
import SalaComun from '/src/assets/salacomun.svg';
import Aula from '/src/assets/aula.svg';
import Laboratorio from '/src/assets/laboratorio.svg';
import Seminario from '/src/assets/seminario.svg';

const chooseColor = (kind: Kind): string => {
  switch (kind) {
    case 'aula':
      return '#2e8be8';

    case 'salacomun':
      return '#95dd10';

    case 'seminario':
      return '#ecac3d';

    case 'laboratorio':
      return '#cc0508';
  
    case 'despacho':
      return '#d355ad';

    default:
      return '';
  }
};


const SpaceIcon = (kind: Kind) => {
  switch (kind) {

    case 'aula':
      return (
          <img
              src={Aula}
              alt="Aula"
              style={{ fill: chooseColor(kind) }} // Establece el color del SVG
              className={'h-full w-24 px-2'} // Aplica clases adicionales si es necesario
          />
      );

      case 'salacomun':
        return (
            <img
              src={SalaComun}
              alt="Sala Comun"
              style={{ fill: chooseColor(kind) }} // Establece el color del SVG
              className={'h-full w-24 px-2'} // Aplica clases adicionales si es necesario
            />
          );
  
    case 'seminario':
        return (
            <img
              src={Seminario}
              alt="Seminario"
              style={{ fill: chooseColor(kind) }} // Establece el color del SVG
              className={'h-full w-24 px-2'} // Aplica clases adicionales si es necesario
            />
          );
  
    case 'laboratorio':
        return (
            <img
              src={Laboratorio}
              alt="Laboratorio"
              style={{ fill: chooseColor(kind) }} // Establece el color del SVG
              className={'h-full w-24 px-2'} // Aplica clases adicionales si es necesario
            />
          );
  
    case 'despacho':
        return (
            <img
              src={Despacho}
              alt="Despacho"
              style={{ fill: chooseColor(kind) }} // Establece el color del SVG
              className={'h-full w-24 px-2'} // Aplica clases adicionales si es necesario
            />
          );

    default:
      return <></>;
  }
};

export { chooseColor, SpaceIcon };