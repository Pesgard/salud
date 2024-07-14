// Asegúrate de importar PacienteNombre si está definido en otro archivo
export interface BiologicosFormulario {
	id: number | null;
	pacienteNombre: PacienteNombre; // Asumiendo que PacienteNombre es un tipo o interfaz definido en otro lugar
	pacienteID: number; // Considera especificar un tipo más concreto si es posible
	td: string;
	dateTD: string;
	sr: string;
	dateSR: string;
	influenza: string;
	dateInfluenza: string;
	cartilla: string;
	dateCartilla: string;
	drogas: string;
	dateDrogas: string;
	otros: string;
	dateOtros: string;
	extras: string;
	documento: any | null; // Considera especificar un tipo más concreto si es posible
}

interface PacienteNombre {
	firstName: string;
	lastName: string;
}

export interface NutricionFormulario {
	id: number | null;
	pacienteNombre: PacienteNombre;
	pacienteID: number;
	date: Date | null;
	peso: number;
	imc: number;
	resultado: number;
	txNutricion: string;
	extra: string;
	documento: string;
}

export interface DiabetesFormulario {
	id: number | null;
	pacienteNombre: PacienteNombre;
	pacienteID: number;
	date: Date | null;
	tipoPaciente: string;
	farmacos: string;
	observaciones: string;
	documento: null;
}

export interface LipidosFormulario {
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	date: Date | null;
	hdl: number;
	colesterol: number;
	trigliceridos: number;
	glucosa: number;
	otros: string;
	farmacos: string;
	extra: string;
}

export interface FisicaFormulario {
	//Estructura de la tabla de supabase
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	deporte: Date | null;
	deporteInicio: Date | null;
	deporteFinal: Date | null;
	otros: Date | null;
	otrosInicio: Date | null;
	otrosFinal: Date | null;
	extra: string;
	documento: null;
}

export interface DrogasFormularios {
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	alcohol: string;
	alcoholDate: Date | null;
	drogas: string;
	drogasDate: Date | null;
	otros: string;
	otrosDate: string;
	informo: boolean;
	extra: string;
	documento: null;
}

export interface DeficienciVisualFormulario {
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	vista: string;
	vistaDate: Date | null;
	auditivo: string;
	auditivoDate: Date | null;
	extra: string;
	documento: null;
}


export interface SaludBucalFormulario {
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	revision: string;
	revisionDate: Date | null;
	documento: string;
	observaciones: string;
}

export interface CursosSeguridadFormulario {
	id: number | null;
	pacienteID: number;
	pacienteNombre: PacienteNombre;
	auxilios: Date | null;
	auxilios_rfc: string;
	rcp: Date | null;
	rcp_rfc: string;
	incendios: Date | null;
	incendios_rfc: string;
	confinados: Date | null;
	confinados_rfc: string;
	otros1: Date | null;
	otros1_rfc: string;
	otros2: Date | null;
	otros2_rfc: string;
	otros3: Date | null;
	otros3_rfc: string;
	extra: string;
	documento: null;
}