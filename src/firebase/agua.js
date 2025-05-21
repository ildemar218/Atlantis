import { collection, getDocs, setDoc, doc } from "firebase/firestore";
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
    const promedioRef = collection(db, `usuarios/${usuarioId}/promedios_consumo`);

    const snapshot = await getDocs(promedioRef);

    const promedioLitros = calcularConsumoDuchaLitros(duchasPorDia, minutosPorDucha, tieneRestrictor);

    if (snapshot.empty) {
      const newDocRef = doc(promedioRef); // genera ID automático
      await setDoc(newDocRef, {
        fecha: new Date().toISOString().split("T")[0],
        promedio_consumo_ducha: promedioLitros
      });

      console.log("Subcolección 'promedios_consumo' creada y consumo registrado.");
    } else {
      console.log("La subcolección 'promedios_consumo' ya existe. No se registró un nuevo documento.");
    }
  } catch (error) {
    console.error("Error al verificar o crear la subcolección:", error);
  }
}
