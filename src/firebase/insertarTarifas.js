import { db } from "../firebase/config.js"; 
import { collection, setDoc, doc } from "firebase/firestore";

const tarifaBaseM3 = 3170;

const tarifasPorLitro = [
  { estrato: 1, porcentaje: 0.32 },
  { estrato: 2, porcentaje: 0.69 },
  { estrato: 3, porcentaje: 0.99 },
  { estrato: 4, porcentaje: 1.00 },
  { estrato: 5, porcentaje: 1.51 },
  { estrato: 6, porcentaje: 1.61 },
];

const guardarTarifasPorLitro = async () => {
  const tarifasRef = collection(db, "tarifas_por_litro");

  for (const item of tarifasPorLitro) {
    const tarifaM3 = tarifaBaseM3 * item.porcentaje;
    const tarifaLitro = tarifaM3 / 1000;

    await setDoc(doc(tarifasRef, `estrato${item.estrato}`), {
      estrato: item.estrato,
      porcentaje_aplicado: item.porcentaje,
      tarifa_por_m3: parseFloat(tarifaM3.toFixed(4)),
      tarifa_por_litro: parseFloat(tarifaLitro.toFixed(6)),
    });
  }
};

guardarTarifasPorLitro();
