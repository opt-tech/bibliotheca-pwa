import { InventoryEventLog } from 'bibliotheca/types';
import { format } from 'date-fns';
import { DataTable, Text } from 'grommet';
import React from 'react';
import { getInventoryEventLogState } from '../interface';

export const InventoryEventLogView = () => {
  const { inventoryEventLogs } = getInventoryEventLogState.useState();
  return (
    <>
      棚卸し
      <DataTable
        size="large"
        primaryKey="id"
        data={inventoryEventLogs}
        columns={[
          {
            property: 'date',
            header: '棚卸し日',
            render: ({ date }: InventoryEventLog) => {
              // todo: goto inventory result page
              return <Text>{format(date, 'YYYY/MM/DD')}</Text>;
            },
          },
        ]}
        sortable
      />
    </>
  );
};
