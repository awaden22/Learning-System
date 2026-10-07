
class NotificationService {
  constructor() {}

  async sendNotification({
    token,
    data,
  }: {
    token: string;
    data: { title: string; body: string };
  }) {
    // TODO: implement notification later
  }

  async sendNotifications({
    tokens,
    data,
  }: {
    tokens: string[];
    data: { title: string; body: string };
  }) {
    // TODO: implement notifications later
  }
}

export default new NotificationService();

