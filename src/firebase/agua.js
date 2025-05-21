import { collection, getDocs, setDoc, doc, updateDoc, query, where } from "firebase/firestore";
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
    const promediosRef = collection(db, `usuarios/${usuarioId}/promedios_consumo`);
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

  return vecesPorSemana * litrosPorCarga;
};

export async function promedioLavadora(usuarioId,  vecesPorSemana,
  usaLavadora,
  tipoLavadora,
  llenaCompleta) {
  try {
    const promediosRef = collection(db, `usuarios/${usuarioId}/promedios_consumo`);
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



