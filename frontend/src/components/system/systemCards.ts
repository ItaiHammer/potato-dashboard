import type { SystemOverview } from '../../types/system';
import type { MetricCardRow } from './MetricCard';

export type SystemCardData = {
  title: string;
  rows: MetricCardRow[];
};

export function getSystemCards(overview: SystemOverview): SystemCardData[] {
  return [
    getCpuCard(overview),
    getMemoryCard(overview),
    ...getDiskCards(overview),
    ...getGpuCards(overview),
  ];
}

function getCpuCard(overview: SystemOverview): SystemCardData {
  return {
    title: 'CPU',
    rows: [
      { label: 'Model', value: overview.cpu.model },
      { label: 'Cores', value: overview.cpu.cores },
      { label: 'Usage', value: overview.cpu.usagePercent },
      { label: 'Temp', value: overview.cpu.temperature },
      { label: 'Speed', value: overview.cpu.speed },
    ],
  };
}

function getMemoryCard(overview: SystemOverview): SystemCardData {
  return {
    title: 'Memory',
    rows: [
      { label: 'Usage', value: overview.memory.usagePercent },
      { label: 'Used', value: overview.memory.used },
      { label: 'Available', value: overview.memory.available },
      { label: 'Total', value: overview.memory.total },
    ],
  };
}

function getDiskCards(overview: SystemOverview): SystemCardData[] {
  if (overview.disk.filesystems.length === 0) {
    return [
      {
        title: 'Disk',
        rows: [{ label: 'Status', value: 'No disks found' }],
      },
    ];
  }

  return overview.disk.filesystems.map((filesystem) => ({
    title: `Disk ${filesystem.label}`,
    rows: [
      { label: 'Usage', value: filesystem.usagePercent },
      { label: 'Used', value: filesystem.used },
      { label: 'Free', value: filesystem.available },
      { label: 'Size', value: filesystem.size },
    ],
  }));
}

function getGpuCards(overview: SystemOverview): SystemCardData[] {
  if (overview.gpu.controllers.length === 0) {
    return [
      {
        title: 'GPU',
        rows: [{ label: 'Status', value: 'No GPU found' }],
      },
    ];
  }

  return overview.gpu.controllers.map((controller, index) => ({
    title: overview.gpu.controllers.length === 1 ? 'GPU' : `GPU ${index + 1}`,
    rows: [
      { label: 'Model', value: `${controller.vendor} ${controller.model}` },
      { label: 'Usage', value: controller.usagePercent },
      { label: 'Temp', value: controller.temperature },
      { label: 'VRAM', value: `${controller.memoryUsed ?? 'N/A'} / ${controller.memoryTotal ?? 'N/A'}` },
    ],
  }));
}
