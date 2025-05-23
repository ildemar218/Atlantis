import { collection, getDocs, getDoc, setDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./config.js"; // asegúrate de que tu archivo firebase.js exporte `db`

/**
 * Calcula el consumo diario de agua en duchas (litros por día)
 * @param {number} duchasPorDia
 * @param {number} minutosPorDucha
 * @param {boolean} tieneRestrictor
 * @returns {number}
 */
function calcularConsumoDuchaLitros(duchasPorDia, minutosPorDucha, tieneRestrictor) {
  const litrosPorMinuto = tieneRestrictor ? 9.5 : 17.5;
  const consumoLitros = duchasPorDia * minutosPorDucha * litrosPorMinuto;
  return Number(consumoLitros.toFixed(2));
}

/**
 * Verifica o crea la subcolección y guarda el promedio calculado
 * @param {string} usuarioId - ID del usuario en Firestore
 * @param {number} duchasPorDia
 * @param {number} minutosPorDucha
 * @param {boolean} tieneRestrictor
 */
export async function promedioDucha(usuarioId, duchasPorDia, minutosPorDucha, tieneRestrictor) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const promedioLitros = calcularConsumoDuchaLitros(duchasPorDia, minutosPorDucha, tieneRestrictor);

    // Buscar documento con fecha igual a hoy
    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Actualizar el documento existente
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, { promedio_consumo_ducha: promedioLitros });
      console.log("Documento actualizado con consumo promedio de ducha.");
    } else {
      // Crear documento nuevo
      const newDocRef = doc(promediosRef);
      await setDoc(newDocRef, {
        fecha: fechaHoy,
        promedio_consumo_ducha: promedioLitros,
      });
      console.log("Documento creado con consumo promedio de ducha.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el consumo promedio de ducha:", error);
  }
}

const calcularConsumoLavadora = (
  vecesPorSemana,
  usaLavadora,
  tipoLavadora,
  llenaCompleta
) => {
  if (!usaLavadora || tipoLavadora === "no aplica") return 0;

  let litrosPorCarga;

  if (tipoLavadora === "carga superior") {
    litrosPorCarga = 150;
  } else if (tipoLavadora === "carga frontal") {
    litrosPorCarga = 90;
  }

  if (!llenaCompleta) {
    litrosPorCarga *= 1.5; // penalización por media carga
  }

  return parseFloat(((vecesPorSemana * litrosPorCarga) / 7).toFixed(2));
};

export async function promedioLavadora(usuarioId,  vecesPorSemana,
  usaLavadora,
  tipoLavadora,
  llenaCompleta) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const promedioLitros = calcularConsumoLavadora( vecesPorSemana,
  usaLavadora,
  tipoLavadora,
  llenaCompleta);

    // Buscar documento con fecha igual a hoy
    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Actualizar el documento existente
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, { promedio_consumo_lavadora: promedioLitros });
      console.log("Documento actualizado con consumo promedio de lavadora.");
    } else {
      // Crear documento nuevo
      const newDocRef = doc(promediosRef);
      await setDoc(newDocRef, {
        fecha: fechaHoy,
        promedio_consumo_lavadora: promedioLitros,
      });
      console.log("Documento creado con consumo promedio de lavadora.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el consumo promedio de lavadora:", error);
  }
}

const calcularConsumoPlatos = (vecesPorDia, metodoLavado, grifoAbierto, lavavajillasBajoConsumo) => {
  if (metodoLavado === "lavavajillas") {
    return vecesPorDia * (lavavajillasBajoConsumo ? 12 : 20); // litros por ciclo
  }

  // Lavado a mano
  const litrosPorLavado = grifoAbierto ? 30 : 15;
  return vecesPorDia * litrosPorLavado;
};

export async function promedioPlatos(usuarioId,  vecesPorDia, metodoLavado, grifoAbierto, lavavajillasBajoConsumo) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const promedioLitros = calcularConsumoPlatos( vecesPorDia, metodoLavado, grifoAbierto, lavavajillasBajoConsumo);

    // Buscar documento con fecha igual a hoy
    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Actualizar el documento existente
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, { promedio_consumo_lavar_platos: promedioLitros });
      console.log("Documento actualizado con consumo promedio lavando platos.");
    } else {
      // Crear documento nuevo
      const newDocRef = doc(promediosRef);
      await setDoc(newDocRef, {
        fecha: fechaHoy,
        promedio_consumo_lavar_platos: promedioLitros,
      });
      console.log("Documento creado con consumo promedio lavando platos.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el consumo promedio de lavar platos:", error);
  }
}

const calcularConsumoRiego = (vecesPorSemana, metodoRiego, minutos) => {
  let litrosPorMinuto;

  if (metodoRiego === "manguera") litrosPorMinuto = 15;
  else if (metodoRiego === "regadera") litrosPorMinuto = 10;
  else if (metodoRiego === "automatico") litrosPorMinuto = 6;

  return parseFloat(((vecesPorSemana * minutos * litrosPorMinuto) / 7).toFixed(2));
};

export async function promedioRiegoPlantas(usuarioId,  vecesPorSemana, metodoRiego, minutos) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const promedioLitros = calcularConsumoRiego( vecesPorSemana, metodoRiego, minutos);

    // Buscar documento con fecha igual a hoy
    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Actualizar el documento existente
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, { promedio_consumo_plantas: promedioLitros });
      console.log("Documento actualizado con consumo promedio regando plantas.");
    } else {
      // Crear documento nuevo
      const newDocRef = doc(promediosRef);
      await setDoc(newDocRef, {
        fecha: fechaHoy,
        promedio_consumo_plantas: promedioLitros,
      });
      console.log("Documento creado con consumo promedio de plantas.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el consumo promedio de plantas:", error);
  }
}

const calcularConsumoLimpieza = (vecesPorSemana, areas, metodoLimpieza) => {
  const litrosPorArea = {
    pisos: 15,
    ventanas: 10,
    cocina: 12,
    baño: 20,
  };

  const factor = metodoLimpieza === "manguera" ? 1.5 : 1; // manguera gasta más

  let totalLitrosPorLimpieza = areas.reduce((acc, area) => acc + (litrosPorArea[area] || 0), 0);

  return parseFloat(((vecesPorSemana * totalLitrosPorLimpieza * factor) / 7).toFixed(2));
};


export async function promedioLimpieza(usuarioId,  vecesPorSemana, areas, metodoLimpieza) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const promedioLitros =calcularConsumoLimpieza( vecesPorSemana, areas, metodoLimpieza);

    // Buscar documento con fecha igual a hoy
    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Actualizar el documento existente
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, { promedio_consumo_limpieza: promedioLitros });
      console.log("Documento actualizado con consumo promedio de limpieza.");
    } else {
      // Crear documento nuevo
      const newDocRef = doc(promediosRef);
      await setDoc(newDocRef, {
        fecha: fechaHoy,
        promedio_consumo_limpieza: promedioLitros,
      });
      console.log("Documento creado con consumo promedio de limpieza.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el consumo promedio de limpieza", error);
  }
}

export async function calcularPromedioGeneral(usuarioId) {
  try {
    const promediosRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);
    const fechaHoy = new Date().toISOString().split("T")[0];

    const q = query(promediosRef, where("fecha", "==", fechaHoy));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("No hay documento de promedio para hoy.");
      return;
    }

    const docSnap = snapshot.docs[0];
    const docRef = docSnap.ref;
    const data = docSnap.data();

    const valores = Object.entries(data)
      .filter(([key]) => key.startsWith("promedio_consumo_"))
      .map(([_, value]) => value);

    if (valores.length === 0) {
      console.log("No se encontraron valores de consumo para calcular el promedio general.");
      return;
    }

    const suma = valores.reduce((acc, val) => acc + val, 0);
    const promedioGeneral = suma;

    await updateDoc(docRef, {
      promedio_general: promedioGeneral,
    });

    console.log("Promedio general actualizado:", promedioGeneral);
  } catch (error) {
    console.error("Error al calcular el promedio general:", error);
  }
}

export async function calcularGastosEstimados(usuarioId, estrato) {
  try {
    // 1. Obtener la tarifa por litro para el estrato dado
    const tarifaDocRef = doc(db, `tarifas_por_litro/estrato${estrato}`);
    const tarifaDocSnap = await getDoc(tarifaDocRef);
    console.log(`estrato${estrato}`)

    if (!tarifaDocSnap.exists()) {
      console.error(`No se encontró el documento de tarifa para el estrato ${estrato}.`);
      return;
    }

    const tarifaData = tarifaDocSnap.data();
    if (tarifaData === undefined || typeof tarifaData.tarifa_por_litro !== 'number') {
      console.error(`El documento del estrato ${estrato} no contiene un campo 'tarifa_por_litro' numérico.`);
      return;
    }
    const tarifaPorLitro = tarifaData.tarifa_por_litro;
    console.log(`Tarifa obtenida para estrato ${estrato}: ${tarifaPorLitro} por litro.`);

    // 2. Obtener los promedios de consumo del usuario para hoy
    const promediosConsumoRef = collection(db, `Usuarios/${usuarioId}/promedios_consumo`);

    const q = query(promediosConsumoRef);
    const snapshotPromedios = await getDocs(q);

    if (snapshotPromedios.empty) {
      console.log(`No se encontró documento de promedios de consumo para el usuario ${usuarioId} en la fecha ${fechaHoy}.`);
      return;
    }

    // Asumimos que solo hay un documento de promedios por día para el usuario
    const docPromediosSnap = snapshotPromedios.docs[0];
    const promediosData = docPromediosSnap.data();

    if (!promediosData) {
        console.log("El documento de promedios no contiene datos.");
        return;
    }

    console.log(`\n--- Gastos Estimados para Usuario: ${usuarioId}, Estrato: ${estrato} ---`);

    // 3. Calcular y mostrar el gasto estimado para cada tipo de consumo
    let valorTotal = 0;
    let seEncontraronConsumos = false;
    for (const [key, value] of Object.entries(promediosData)) {
      if (key.startsWith("promedio_consumo_") && typeof value === 'number') {
        seEncontraronConsumos = true;
        const nombreConsumo = key.replace("promedio_consumo_", "").replace(/_/g, " "); // Ej: "ducha", "lavar ropa"
        const gastoEstimado = ((value * 30) * (tarifaPorLitro * 1000));
        
        console.log("Tarifa: ", tarifaPorLitro * 1000)
        valorTotal += parseFloat(gastoEstimado)

        console.log(`Gasto estimado ${nombreConsumo}: ${gastoEstimado.toFixed(2)}`);
        console.log("Litros totales:", value * 30)
      }
    }
    console.log("Gasto total: ", valorTotal.toFixed(2))

    if (!seEncontraronConsumos) {
        console.log("No se encontraron campos de 'promedio_consumo_' en el documento del usuario.");
    }

  } catch (error) {
    console.error("Error al calcular los gastos estimados:", error);
  }
}



