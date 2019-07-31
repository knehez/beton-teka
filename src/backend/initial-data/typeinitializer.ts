import { MeasurementType } from '../entities/measurementType';
import { Initializer } from './initializer';
import { getRepository } from 'typeorm';



export default class MeasurementTypeInitializer extends Initializer {
    repository = getRepository(MeasurementType);

    measurementTypes = [
        'Density measurement (density (g/cm3))',
        'Compression testing(Compression strength(MPa), Compression modulus(MPa))',
        'Tensile testing(Tensile strength(MPa), Tensile modulus(MPa), Extension at break (%))',
        '3 point bending test(Bending modulus(MPa), Bending strength(MPa))',
        'Shore hardness(00, 0, A és D hardnesses)',
        'Rockwell hradness(HRM és HRR)',
        'Impact testing(Charpy, Izod impact strength(N / mm))',
        'Adhesion testing(Adhesion strength N / mm)',
        'Vicat testing(Vicat softening temperature(°C))',
        'HDT(Heat deflecting temperature(°C))',
        'Chemical resistance 1.(swelling test)',
        'Chemical resistance 2.(Stress corrosion)',
        'Humidity measurement with heated scale(Humidity content %)',
        'UV ageing(High and low intensity UV radiation, also Suntets)',
        'Thermal Ageing(Climate chamber)',
        'Flammability testing 1.(UL - 94 vertical and horizontal)',
        'Flammability testing 2.(LOI)',
        'Flammability testing 3.(SES)',
        'DSC 1.(Measuring reaction kinetics)',
        'DSC 2.(Reactivity after production)',
        'DSC 3.(Thermal stability)',
        'Lézer dilatometry(CTE, Linear thermal expansion coefficient)',
        'DMA 1.(CTE)',
        'DMA 2.(Temperature and frequency dependence of mechanical properties maximum and minimum application temperature)',
        'DMA 3.(Reaction kinetics measurements crosslinking kinetics)',
        'Thermal conductivity measurement CTI(Thermal conductivity(W / mK))',
        'Heath flux thermal cunductivity measurement(Thermal conductivity(W / mK))',
        'Fluidity index(MFI, MFR(g / 10min) or MVR(cm3 / 10min))',
        'Foaming rate(Foam hardening time, kinetics)',
        'Microscopic cell structure evaluation(Cell structure)',
        'Bomb calorimetry(Heat of burning)',
        'Surface resistance measurement(Static charging behaviour)',
        'Resistance measurement(Electric conductivity resistance)',
        'TSD(Structural mobility, reorganization)',
        'SEM(Microstructure, cell structure)',
        'Extrusiometric measurements(reology, processability)',
        'Glow wire tests(GWIT, GWFT / GWFI(°C))',
        'Derivatographic tests(TG, DTG, TA)',
        'Ash content measurements(Determination of inorganic contents, fillers e.g.glass fiber)'
    ];


    async initialize() {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if (entityCount !== 0) {
            return;
        }

        for (const measurementType of this.measurementTypes) {
            const type = new MeasurementType();
            type.name = measurementType;
            await this.repository.save(type);
        }
    }
}
