export type SystemOverview = {
  status: string;
  timestamp: string;
  cpu: {
    model: string;
    cores: number;
    usagePercent: string;
    temperature: string | null;
    speed: string | null;
  };
  memory: {
    total: string;
    used: string;
    available: string;
    usagePercent: string;
  };
  disk: {
    filesystems: Array<{
      label: string;
      filesystem: string;
      mount: string;
      size: string;
      used: string;
      available: string;
      usagePercent: string;
    }>;
  };
  gpu: {
    controllers: Array<{
      vendor: string;
      model: string;
      temperature: string | null;
      memoryUsed: string | null;
      memoryTotal: string | null;
      usagePercent: string | null;
    }>;
  };
};
