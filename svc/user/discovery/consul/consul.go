package consul

type DiscoveryService struct {}

func (svc *DiscoveryService) RegisterSelf() error {
	return nil
}

func (svc *DiscoveryService) DiscoverDB() {}

func (svc *DiscoveryService) DiscoverSVC(svcID string) (string, error) {
	return "", nil
}

func (svc *DiscoveryService) HealthCheck() error {
	return nil
}