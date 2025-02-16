import { KumaService } from './kuma.service';
import { UpdateKumaDto } from './dto/update-kuma.dto';
import { CreateKumaDto } from './dto/create-kuma.dto';
import { RemoveKumaDto } from './dto/remove-kuma.dto';
export declare class KumaController {
    private readonly kumaService;
    constructor(kumaService: KumaService);
    monitor(monitorKumaDto: any): Promise<string>;
    create(createKumaDto: CreateKumaDto): Promise<string>;
    test(): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKumaDto: UpdateKumaDto): string;
    remove(removeKumaDto: RemoveKumaDto): Promise<string>;
}
