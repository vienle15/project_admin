export function getAllItems(tableName: string) {
  const entities: any[] = JSON.parse(localStorage.getItem(tableName) || "[]");

  return entities;
}

export function insertItem(tableName: string, entity: any) {
  try {
    if (!entity.id) {
      const entities: any[] = JSON.parse(
        localStorage.getItem(tableName) || "[]"
      );

      let id = 0;
      for (const _entity of entities) {
        if (_entity.id > id) {
          id = _entity.id;
        }
      }

      entity.id = id + 1;

      entities.push(entity);
      localStorage.setItem(tableName, JSON.stringify(entities));

      return entity.id;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}

export function updateItem(tableName: string, entity: any) {
  try {
    if (entity.id) {
      const entities: any[] = JSON.parse(
        localStorage.getItem(tableName) || "[]"
      );

      for (let _entity of entities) {
        if (_entity.id === entity.id) {
          _entity = entity;
          break;
        }
      }

      localStorage.setItem(tableName, JSON.stringify(entities));

      return entity.id;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}

export function deleteItemById(tableName: string, id: number) {
  try {
    const entities: any[] = JSON.parse(localStorage.getItem(tableName) || "[]");

    let delIndex = -1;
    for (let i = 0; i < entities.length; i++) {
      const _entity = entities[i];
      if (_entity.id === id) {
        delIndex = i;
      }
    }

    if (delIndex !== -1) {
      entities.splice(delIndex, 1);
      localStorage.setItem(tableName, JSON.stringify(entities));
    }

    return true;
  } catch (error) {
    return false;
  }
}

export function getItemsByConditions(
  tableName: string,
  conditions: { key: string; value: string | number | boolean }[]
) {
  const entities: any[] = JSON.parse(localStorage.getItem(tableName) || "[]");
  const _entities = entities.filter((entity) =>
    conditions.find((condition) => condition.value === entity[condition.key])
  );
  return _entities;
}
