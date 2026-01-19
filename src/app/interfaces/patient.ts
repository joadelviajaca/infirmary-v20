interface Patient {
id: string;
name: string;
infection: number; // Porcentaje de infección (0-100)
status: 'estable' | 'critico' | 'transformado';
}