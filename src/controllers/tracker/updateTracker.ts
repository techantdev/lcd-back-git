const updateTracker = async () => {
  // TODO: Input .reduce / Object.entries() / .map forof
  // El código no puede tener más de 100 líneas. ideal  (40 lineas)
  const trackerRows = [
    { trackerRowIndex: 2, trackerRowStartDate: 'v1', trackerRowCatalogAchievementId: 'v2', name: 'Cristian' },
    { trackerRowIndex: 4, trackerRowCatalogUnitId: 'v3', trackerRowActivity: 'v4' }
  ];

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
};

export default updateTracker;
