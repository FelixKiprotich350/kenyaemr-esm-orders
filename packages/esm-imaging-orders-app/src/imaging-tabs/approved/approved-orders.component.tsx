import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableSkeleton } from '@carbon/react';
import { useOrdersWorkList } from '../../hooks/useOrdersWorklist';
import GroupedOrdersTable from '../../shared/ui/common/grouped-orders-table.component';

export const ApprovedOrders: React.FC = () => {
  const { t } = useTranslation();
  const { workListEntries, isLoading } = useOrdersWorkList('', 'COMPLETED');
  const approved = workListEntries.filter((item) =>
    item.procedures?.some((procedure) => procedure.outcome === 'SUCCESSFUL'),
  );

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return (
    <div>
      <GroupedOrdersTable
        orders={approved}
        showStatus={false}
        showStartButton={false}
        showActions={false}
        showOrderType={true}
        actions={[]}
        title={t('approvedOrders', 'Approved Orders')}
      />
    </div>
  );
};
