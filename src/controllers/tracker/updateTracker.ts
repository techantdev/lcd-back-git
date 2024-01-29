const updateTracker = async () => {
  // TODO: Input .reduce / Object.entries() / .map forof
  // El código no puede tener más de 100 líneas. ideal  (40 lineas)
  /*
  const trackerRows = [
    { trackerRowIndex: 2, trackerRowStartDate: 'v1', trackerRowCatalogAchievementId: 'v2', name: 'Cristian' },
    { trackerRowIndex: 4, trackerRowCatalogUnitId: 'v3', trackerRowActivity: 'v4' }
  ];
  */
  /*
  // Output String que tenga la siguiente esctructura
  const setter = `trackerRows[2].trackerRowStartDate = :2trackerRowStartDate,
  trackerRows[2].trackerRowCatalogAchievementId = :2trackerRowCatalogAchievementId,
  trackerRows[2].name = :2name,
  trackerRows[4].trackerRowCatalogUnitId = :4trackerRowCatalogUnitId,
  trackerRows[4].trackerRowActivity = :4trackerRowActivity`;

  const aux = {
    ':2trackerRowStartDate': 'v1',
    ':2trackerRowCatalogAchievementId': 'v2',
    ':2name': 'Cristian',
    ':4trackerRowCatalogUnitId': 'v3',
    ':4trackerRowActivity': 'v4'
  };
  */
  // Definimos la estructura de los objectos que se espera que tenga trackerRows
  interface TrackerRow {
    trackerRowIndex: number;
    trackerRowStartDate?: string;
    trackerRowCatalogAchievementId?: string;
    name?: string;
    trackerRowCatalogUnitId?: string;
    trackerRowActivity?: string;
  }
  // Creamos la estructura del arrego de objectos INPUT
  const trackerRows: TrackerRow[] = [
    {
      trackerRowIndex: 2,
      trackerRowStartDate: 'v1',
      trackerRowCatalogAchievementId: 'v2',
      name: 'Cristian',
      trackerRowCatalogUnitId: 'Gfhghg'
    },
    {
      trackerRowIndex: 4,
      trackerRowCatalogUnitId: 'v3',
      trackerRowActivity: 'v4',
      trackerRowStartDate: '12-12-2023'
    },
    {
      trackerRowIndex: 5,
      trackerRowActivity: 'jugar'
    }
  ];
  // Se crea la funcion transformData que tiene por parametro rows que se espera que se del tipo
  const transformData = (rows: TrackerRow[]) => {
    // Se definen las salidas
    const output: string[] = [];
    const aux: { [key: string]: string } = {};
    // Itera sobre cada elemento
    rows.forEach(row => {
      // metodo que itera sobre cada item de row
      const { trackerRowIndex, ...properties } = row; // Parte a la informacion, extrae la informacion trackerRowIndex del objeto row, y el resto de las propiedades se agrupan en un nuevo objeto llamado properties.

      Object.entries(properties).forEach(([key, value]) => {
        const placeholder = `:${trackerRowIndex}${key}`;

        output.push(`trackerRows[${trackerRowIndex}].${key} = ${placeholder}`);
        aux[placeholder] = value!;
      });
    });

    const setter = output.join(',\n  ');

    return { setter, aux };
  };

  const { setter, aux } = transformData(trackerRows);

  console.log('Setter:');
  console.log(setter);
  console.log('\nAux:');
  console.log(aux);
};

export default updateTracker;
